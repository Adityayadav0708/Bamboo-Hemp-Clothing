/**
 * productService.js
 *
 * All product-related API calls are centralized here.
 * During development (or if backend is unavailable), mock data is used.
 * When the backend is ready, only this file needs to change — pages/components stay the same.
 */

import {
  MOCK_PRODUCTS,
  getProductBySlug,
  getProductsByCategory,
  getBestsellers,
  getNewArrivals,
  getRelatedProducts,
} from "@/data/products";
import { MOCK_CATEGORIES, getCategoryBySlug } from "@/data/categories";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ── Helpers ─────────────────────────────────────────────────────────────────

function useMock() {
  // Use mock data if no API URL is set (development without backend)
  return !API_URL;
}

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${res.status}`);
  }
  return res.json();
}

// ── Products ─────────────────────────────────────────────────────────────────

/**
 * Get all products with optional filters.
 * @param {Object} filters - { category, size, color, minPrice, maxPrice, sort, page, limit }
 */
export async function getAllProducts(filters = {}) {
  if (useMock()) {
    // Client-side filter mock data
    let products = [...MOCK_PRODUCTS];
    if (filters.category) {
      products = products.filter((p) => p.category === filters.category);
    }
    if (filters.size) {
      products = products.filter((p) => p.sizes.includes(filters.size));
    }
    if (filters.color) {
      products = products.filter((p) =>
        p.colors.some((c) => c.slug === filters.color)
      );
    }
    if (filters.minPrice) {
      products = products.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      products = products.filter((p) => p.price <= Number(filters.maxPrice));
    }
    // Sorting
    if (filters.sort === "price-asc")
      products.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc")
      products.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating")
      products.sort((a, b) => b.rating - a.rating);

    return { products, total: products.length };
  }
  const params = new URLSearchParams(filters).toString();
  return fetchAPI(`/products?${params}`);
}

/**
 * Get a single product by slug.
 */
export async function getProductBySlugAPI(slug) {
  if (useMock()) {
    const product = getProductBySlug(slug);
    if (!product) throw new Error("Product not found");
    return product;
  }
  return fetchAPI(`/products/${slug}`);
}

/**
 * Get products by category slug.
 */
export async function getProductsByCategoryAPI(slug, filters = {}) {
  if (useMock()) {
    return { products: getProductsByCategory(slug), total: getProductsByCategory(slug).length };
  }
  const params = new URLSearchParams({ category: slug, ...filters }).toString();
  return fetchAPI(`/products?${params}`);
}

/**
 * Get bestselling products.
 */
export async function getBestsellersAPI(limit = 6) {
  if (useMock()) return getBestsellers(limit);
  return fetchAPI(`/products?sort=popularity&limit=${limit}`);
}

/**
 * Get new arrivals.
 */
export async function getNewArrivalsAPI(limit = 4) {
  if (useMock()) return getNewArrivals(limit);
  return fetchAPI(`/products?sort=newest&limit=${limit}`);
}

/**
 * Get related products.
 */
export async function getRelatedProductsAPI(productId, categorySlug, limit = 4) {
  if (useMock()) return getRelatedProducts(productId, categorySlug, limit);
  return fetchAPI(`/products/${productId}/related?limit=${limit}`);
}

// ── Categories ───────────────────────────────────────────────────────────────

/**
 * Get all categories.
 */
export async function getAllCategories() {
  if (useMock()) return MOCK_CATEGORIES;
  return fetchAPI("/categories");
}

/**
 * Get a single category by slug.
 */
export async function getCategoryBySlugAPI(slug) {
  if (useMock()) {
    const cat = getCategoryBySlug(slug);
    if (!cat) throw new Error("Category not found");
    return cat;
  }
  return fetchAPI(`/categories/${slug}`);
}
