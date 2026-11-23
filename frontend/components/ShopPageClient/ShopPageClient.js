"use client";
import { useState, useMemo } from "react";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import SortDropdown from "@/components/SortDropdown";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import { MOCK_PRODUCTS } from "@/data/products";
import { MOCK_CATEGORIES } from "@/data/categories";
import styles from "./ShopPageClient.module.css";

export default function ShopPageClient({ initialSearch = "", initialCategory = "" }) {
  const [filters, setFilters] = useState({
    category: initialCategory, size: "", color: "", minPrice: 0, maxPrice: 10000,
  });
  const [sort, setSort] = useState("default");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState(initialSearch);

  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.includes(q)
      );
    }
    if (filters.category) list = list.filter((p) => p.category === filters.category);
    if (filters.size)     list = list.filter((p) => p.sizes.includes(filters.size));
    if (filters.color)    list = list.filter((p) => p.colors.some((c) => c.slug === filters.color));
    if (filters.minPrice) list = list.filter((p) => p.price >= filters.minPrice);
    if (filters.maxPrice) list = list.filter((p) => p.price <= filters.maxPrice);

    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    if (sort === "newest")     list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));

    return list;
  }, [filters, sort, search]);

  function resetFilters() {
    setFilters({ category: "", size: "", color: "", minPrice: 0, maxPrice: 10000 });
    setSearch("");
  }

  const hasFilters = Object.values(filters).some((v) => v !== "" && v !== 0 && v !== 10000) || !!search;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Shop All" }]} />

        {/* Page header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.heading}>Shop All</h1>
            <p className={styles.count}>
              Showing {filtered.length} of {MOCK_PRODUCTS.length} products
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
          {/* Sidebar — desktop */}
          <aside className={styles.sidebar}>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              categories={MOCK_CATEGORIES}
              onReset={resetFilters}
            />
          </aside>

          {/* Product grid */}
          <div className={styles.main}>
            {filtered.length > 0 ? (
              <ProductGrid products={filtered} columns={3} />
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

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHead}>
              <span>Filters</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close filters">✕</button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={(f) => { setFilters(f); setDrawerOpen(false); }}
              categories={MOCK_CATEGORIES}
              onReset={() => { resetFilters(); setDrawerOpen(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
