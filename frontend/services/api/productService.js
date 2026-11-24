/**
 * productService.js
 *
 * Centralized catalogue API service fetching from Express backend
 * (/products, /products/search, /products/:slug, /products/:id/related, /categories)
 * with response normalization and graceful static fallback when offline/building.
 */

import {
  MOCK_PRODUCTS,
  getProductBySlug as getMockProductBySlug,
  getProductsByCategory as getMockProductsByCategory,
  getBestsellers as getMockBestsellers,
  getNewArrivals as getMockNewArrivals,
  getRelatedProducts as getMockRelatedProducts,
} from "@/data/products";
import { MOCK_CATEGORIES, getCategoryBySlug as getMockCategoryBySlug } from "@/data/categories";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "XXL"];

function toSlug(val = "") {
  return val
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeCategory(cat) {
  if (!cat) return null;
  const fallback = cat.slug ? getMockCategoryBySlug(cat.slug) : null;
  return {
    id: (cat._id || cat.id || cat.slug).toString(),
    slug: cat.slug,
    name: cat.name || fallback?.name || "",
    shortName: cat.shortName || fallback?.shortName || (cat.name || "").replace("T-Shirts", "Tees"),
    description: cat.description || fallback?.description || "",
    bannerImage: cat.bannerImage || fallback?.bannerImage || "",
    cardImage: cat.cardImage || cat.image || fallback?.cardImage || "",
    productCount: cat.productCount ?? fallback?.productCount ?? 0,
    featured: cat.featured ?? true,
  };
}

export function normalizeProduct(raw) {
  if (!raw) return null;
  const fallback = raw.slug ? getMockProductBySlug(raw.slug) : null;
  const variants = Array.isArray(raw.variants) ? raw.variants : [];
  const activeVariants = variants.filter((v) => v.isActive !== false);
  const firstVar = activeVariants[0] || variants[0];

  const price =
    raw.price ??
    firstVar?.price ??
    (firstVar?.pricePaise !== undefined ? firstVar.pricePaise / 100 : undefined) ??
    fallback?.price ??
    990;

  const originalPrice =
    raw.originalPrice ??
    firstVar?.mrp ??
    (firstVar?.compareAtPricePaise !== undefined ? firstVar.compareAtPricePaise / 100 : undefined) ??
    fallback?.originalPrice ??
    price;

  const images =
    Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images.map((img) => (typeof img === "string" ? img : img?.url)).filter(Boolean)
      : fallback?.images || ["/images/products/heelium-men-tee-black.png"];

  const firstCat = Array.isArray(raw.categoryIds) ? raw.categoryIds[0] : null;
  const category =
    raw.category ||
    (typeof firstCat === "object" && firstCat?.slug ? firstCat.slug : null) ||
    fallback?.category ||
    "bamboo-tshirts";

  const mockCat = getMockCategoryBySlug(category);
  const categoryLabel =
    raw.categoryLabel ||
    (typeof firstCat === "object" && firstCat?.name ? firstCat.name : null) ||
    mockCat?.name ||
    fallback?.categoryLabel ||
    "Apparel";

  // Extract deduplicated sizes sorted cleanly
  let sizes = [];
  if (activeVariants.length > 0) {
    const uniqueSizes = Array.from(new Set(activeVariants.map((v) => v.size).filter(Boolean)));
    sizes = uniqueSizes.sort((a, b) => {
      const ia = SIZE_ORDER.indexOf(a.toUpperCase());
      const ib = SIZE_ORDER.indexOf(b.toUpperCase());
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  } else {
    sizes = raw.sizes || fallback?.sizes || ["S", "M", "L", "XL"];
  }

  // Extract deduplicated colors from variants
  let colors = [];
  if (activeVariants.length > 0) {
    const seen = new Map();
    for (const v of activeVariants) {
      const cName = v.color?.name || v.colour?.name || (typeof v.colour === "string" ? v.colour : "");
      if (!cName) continue;
      const slug = toSlug(cName);
      if (!seen.has(slug)) {
        seen.set(slug, {
          name: cName,
          hex: v.color?.hex || v.colour?.hex || "#244B3C",
          slug,
        });
      }
    }
    colors = Array.from(seen.values());
  } else {
    colors = raw.colors || fallback?.colors || [];
  }

  const badges =
    Array.isArray(raw.badges) && raw.badges.length > 0
      ? raw.badges
      : raw.badge
      ? [raw.badge]
      : fallback?.badges || [];

  const materialStory = raw.materialStory
    ? {
        ...(fallback?.materialStory || {}),
        ...raw.materialStory,
        headline: raw.materialStory.headline || raw.materialStory.title || fallback?.materialStory?.headline,
        subtext: raw.materialStory.subtext || raw.materialStory.content || fallback?.materialStory?.subtext,
        breakdown: raw.materialStory.breakdown || fallback?.materialStory?.breakdown,
      }
    : fallback?.materialStory;

  return {
    id: (raw._id || raw.id || raw.slug).toString(),
    _id: raw._id ? raw._id.toString() : raw.id,
    slug: raw.slug,
    name: raw.name,
    category,
    categoryLabel,
    price: Number(price),
    originalPrice: Number(originalPrice),
    currency: raw.currency || "INR",
    images,
    colors,
    sizes,
    badges,
    description: raw.description || fallback?.description || "",
    fabric: raw.materialDetails || raw.fabric || fallback?.fabric || "",
    care:
      Array.isArray(raw.careInstructions) && raw.careInstructions.length > 0
        ? raw.careInstructions.join(" ")
        : raw.care || fallback?.care || "",
    inStock:
      activeVariants.length > 0
        ? activeVariants.some((v) => (v.inventoryCount ?? v.stockQuantity ?? 1) > 0)
        : raw.inStock ?? true,
    rating: raw.rating ?? fallback?.rating ?? 4.8,
    reviewCount: raw.reviewsCount ?? raw.reviewCount ?? fallback?.reviewCount ?? 45,
    isNew: raw.isNew ?? fallback?.isNew ?? false,
    isBestseller: raw.isBestseller ?? (badges.includes("Bestseller") || fallback?.isBestseller || false),
    variants,
    materialStory,
    constructionDetails: raw.constructionDetails || fallback?.constructionDetails,
    stylingNote: raw.stylingNote || fallback?.stylingNote,
    fitGuide: raw.fitGuide || fallback?.fitGuide,
    reviews: raw.reviews || fallback?.reviews,
    faqs: Array.isArray(raw.faqs) && raw.faqs.length > 0 ? raw.faqs : fallback?.faqs,
  };
}

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...(typeof window === "undefined" ? { cache: "no-store" } : {}),
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error?.message || data.message || `API error: ${res.status}`);
  }
  return data;
}

function buildQueryParams(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "" && !(k === "maxPrice" && Number(v) >= 10000)) {
      params.set(k, String(v));
    }
  });
  return params.toString();
}

function filterMockProducts(filters = {}) {
  let products = [...MOCK_PRODUCTS];
  if (filters.search) {
    const q = filters.search.toLowerCase().trim();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q))
    );
  }
  if (filters.category) products = products.filter((p) => p.category === filters.category);
  if (filters.size) products = products.filter((p) => p.sizes.includes(filters.size));
  if (filters.color) products = products.filter((p) => p.colors.some((c) => c.slug === filters.color));
  if (filters.minPrice) products = products.filter((p) => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) products = products.filter((p) => p.price <= Number(filters.maxPrice));

  if (filters.sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (filters.sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (filters.sort === "rating") products.sort((a, b) => b.rating - a.rating);
  if (filters.sort === "newest") {
    products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew));
  }

  const limit = filters.limit ? Number(filters.limit) : products.length;
  const sliced = products.slice(0, limit);
  return { products: sliced.map(normalizeProduct), total: products.length, source: "fallback" };
}

/**
 * Get all products with optional filters from GET /api/v1/products.
 */
export async function getAllProducts(filters = {}) {
  if (API_URL) {
    try {
      const qs = buildQueryParams({ limit: 50, ...filters });
      const res = await fetchAPI(`/products${qs ? `?${qs}` : ""}`);
      if (res && Array.isArray(res.data)) {
        return {
          products: res.data.map(normalizeProduct),
          total: res.pagination?.totalItems ?? res.data.length,
          pagination: res.pagination || null,
          source: "api",
        };
      }
    } catch (err) {
      console.warn("[productService] getAllProducts fallback:", err.message);
    }
  }
  return filterMockProducts(filters);
}

/**
 * Search products via GET /api/v1/products/search?q=...
 */
export async function searchProductsAPI(query, filters = {}) {
  const trimmed = (query || "").trim();
  if (!trimmed) {
    return getAllProducts(filters);
  }

  if (API_URL) {
    try {
      const qs = buildQueryParams({ q: trimmed, limit: 50, ...filters });
      const res = await fetchAPI(`/products/search?${qs}`);
      if (res && Array.isArray(res.data)) {
        return {
          products: res.data.map(normalizeProduct),
          total: res.pagination?.totalItems ?? res.data.length,
          pagination: res.pagination || null,
          source: "api",
        };
      }
    } catch (err) {
      console.warn("[productService] searchProductsAPI fallback:", err.message);
    }
  }

  return filterMockProducts({ ...filters, search: trimmed });
}

/**
 * Get a single product by slug via GET /api/v1/products/:slug.
 */
export async function getProductBySlugAPI(slug) {
  if (API_URL) {
    try {
      const res = await fetchAPI(`/products/${encodeURIComponent(slug)}`);
      if (res && res.data) {
        return normalizeProduct(res.data);
      }
    } catch (err) {
      // Only return null cleanly on 404 if message says not found, else check fallback
      console.warn("[productService] getProductBySlugAPI fallback:", err.message);
    }
  }
  const product = getMockProductBySlug(slug);
  if (!product) return null;
  return normalizeProduct(product);
}

/**
 * Get products by category slug via GET /api/v1/products?category=...
 */
export async function getProductsByCategoryAPI(slug, filters = {}) {
  return getAllProducts({ category: slug, ...filters });
}

/**
 * Get bestselling products.
 */
export async function getBestsellersAPI(limit = 6) {
  if (API_URL) {
    try {
      const res = await fetchAPI(`/products?sort=popularity&limit=${limit}`);
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(normalizeProduct);
      }
    } catch {}
  }
  return getMockBestsellers(limit).map(normalizeProduct);
}

/**
 * Get new arrivals.
 */
export async function getNewArrivalsAPI(limit = 4) {
  if (API_URL) {
    try {
      const res = await fetchAPI(`/products?sort=newest&limit=${limit}`);
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(normalizeProduct);
      }
    } catch {}
  }
  return getMockNewArrivals(limit).map(normalizeProduct);
}

/**
 * Get related products via GET /api/v1/products/:productId/related.
 */
export async function getRelatedProductsAPI(productId, categorySlug, limit = 4) {
  if (API_URL && productId) {
    try {
      const res = await fetchAPI(`/products/${encodeURIComponent(productId)}/related?limit=${limit}`);
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(normalizeProduct);
      }
    } catch {}
  }
  return getMockRelatedProducts(productId, categorySlug, limit).map(normalizeProduct);
}

/**
 * Get all categories via GET /api/v1/categories.
 */
export async function getAllCategories() {
  if (API_URL) {
    try {
      const res = await fetchAPI("/categories");
      if (res && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(normalizeCategory);
      }
    } catch (err) {
      console.warn("[productService] getAllCategories fallback:", err.message);
    }
  }
  return MOCK_CATEGORIES.map(normalizeCategory);
}

/**
 * Get a single category by slug via GET /api/v1/categories/:slug.
 */
export async function getCategoryBySlugAPI(slug) {
  if (API_URL) {
    try {
      const res = await fetchAPI(`/categories/${encodeURIComponent(slug)}`);
      if (res && res.data) {
        return normalizeCategory(res.data);
      }
    } catch (err) {
      console.warn("[productService] getCategoryBySlugAPI fallback:", err.message);
    }
  }
  const cat = getMockCategoryBySlug(slug);
  return cat ? normalizeCategory(cat) : null;
}

/** Helper to match a selected size + color slug to a backend Variant._id. */
export function findMatchingVariantId(product, size, colorSlug) {
  if (!product?.variants?.length) return undefined;
  const targetColor = toSlug(colorSlug || "");
  const matched =
    product.variants.find((v) => {
      const sizeMatch = !size || v.size?.toLowerCase() === size.toLowerCase();
      const cName = v.color?.name || v.colour?.name || "";
      const colorMatch = !targetColor || toSlug(cName) === targetColor;
      return sizeMatch && colorMatch;
    }) || product.variants[0];
  return matched?._id ? matched._id.toString() : undefined;
}
