"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getAllProducts, searchProductsAPI, getAllCategories } from "@/services/api/productService";
import styles from "./ShopPageClient.module.css";

export default function ShopPageClient({
  initialProducts = [],
  initialCategories = [],
  initialTotal = null,
  initialSearch = "",
  initialCategory = "",
}) {
  const router = useRouter();

  const [filters, setFilters] = useState({
    category: initialCategory,
    size: "",
    color: "",
    minPrice: 0,
    maxPrice: 10000,
  });
  const [sort, setSort] = useState("default");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);

  const [categories, setCategories] = useState(initialCategories);
  const initialKey = JSON.stringify({
    category: initialCategory,
    size: "",
    color: "",
    minPrice: 0,
    maxPrice: 10000,
    sort: "default",
    search: initialSearch,
  });

  const [catalogueState, setCatalogueState] = useState({
    loadedKey: initialProducts.length > 0 ? initialKey : "",
    products: initialProducts,
    total: initialTotal ?? initialProducts.length,
  });

  const currentKey = JSON.stringify({
    category: filters.category,
    size: filters.size,
    color: filters.color,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort,
    search,
  });

  // Load categories dynamically if not passed from server
  useEffect(() => {
    if (categories.length > 0) return;
    let cancelled = false;
    getAllCategories()
      .then((cats) => {
        if (!cancelled && Array.isArray(cats)) setCategories(cats);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [categories.length]);

  // Query live backend /api/v1/products or /api/v1/products/search on filter/sort/search changes
  useEffect(() => {
    let cancelled = false;
    const apiFilters = {
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.size ? { size: filters.size } : {}),
      ...(filters.color ? { color: filters.color } : {}),
      ...(filters.minPrice > 0 ? { minPrice: filters.minPrice } : {}),
      ...(filters.maxPrice < 10000 ? { maxPrice: filters.maxPrice } : {}),
      ...(sort !== "default" ? { sort } : {}),
    };

    const fetcher = search.trim()
      ? searchProductsAPI(search.trim(), apiFilters)
      : getAllProducts(apiFilters);

    fetcher
      .then((res) => {
        if (!cancelled && res) {
          setCatalogueState({
            loadedKey: currentKey,
            products: res.products || [],
            total: res.total ?? (res.products?.length || 0),
          });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCatalogueState((prev) => ({ ...prev, loadedKey: currentKey }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentKey, filters, sort, search]);

  const availableColors = useMemo(() => {
    const colorMap = new Map();
    const pool = initialProducts.length > 0 ? initialProducts : catalogueState.products;
    for (const p of pool) {
      for (const c of p.colors || []) {
        if (c.slug && !colorMap.has(c.slug)) {
          colorMap.set(c.slug, c);
        }
      }
    }
    return Array.from(colorMap.values()).slice(0, 8);
  }, [initialProducts, catalogueState.products]);

  function resetFilters() {
    setFilters({ category: initialCategory, size: "", color: "", minPrice: 0, maxPrice: 10000 });
    setSort("default");
    setSearch("");
    if (initialSearch) {
      router.push(initialCategory ? `/category/${initialCategory}` : "/shop");
    }
  }

  const hasFilters =
    Object.entries(filters).some(([k, v]) =>
      k === "category"
        ? !!v && v !== initialCategory
        : k !== "maxPrice"
        ? !!v
        : v !== 10000
    ) || !!search;

  const isLoading = catalogueState.loadedKey !== currentKey;
  const products = catalogueState.products;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {!initialCategory && <Breadcrumb items={[{ label: "Shop All" }]} />}

        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>
              {initialCategory
                ? categories.find((c) => c.slug === initialCategory)?.name || "Collection"
                : "Shop All"}
            </h1>
            <p className={styles.count}>
              Showing {products.length} {products.length === 1 ? "product" : "products"}
              {search && <> for &ldquo;<strong>{search}</strong>&rdquo;</>}
            </p>
          </div>
          <div className={styles.controls}>
            <button className={styles.filterToggle} onClick={() => setDrawerOpen(true)}>
              ⚙ Filters {hasFilters && <span className={styles.filterBadge}>•</span>}
            </button>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              categories={categories}
              availableColors={availableColors}
              onReset={resetFilters}
            />
          </aside>

          <div className={styles.main}>
            {isLoading && products.length === 0 ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "3rem 0" }}>
                <LoadingSpinner size="lg" label="Loading products…" />
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} columns={3} />
            ) : (
              <EmptyState
                icon="🔍"
                title="No products found"
                message="Try adjusting your filters or search term."
                ctaLabel="Clear Filters"
                ctaHref="/shop"
              />
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHead}>
              <span>Filters</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">✕</button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => {
                setFilters(f);
                setDrawerOpen(false);
              }}
              categories={categories}
              availableColors={availableColors}
              onReset={() => {
                resetFilters();
                setDrawerOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
