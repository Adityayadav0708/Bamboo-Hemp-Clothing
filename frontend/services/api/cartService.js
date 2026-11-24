/**
 * cartService.js
 *
 * Cart API calls for syncing shopping cart state with the Express backend.
 */

import { API_URL, apiFetch } from "./apiClient";

/** Fetch the user's or guest's server-side cart. */
export async function getCart() {
  if (!API_URL) return null;
  const res = await apiFetch("/cart");
  return res?.data || null;
}

/** Merge guest/localStorage cart items into the active server cart (e.g. on login). */
export async function syncCart(items = []) {
  if (!API_URL) return null;
  const res = await apiFetch("/cart/sync", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
  return res?.data || null;
}

/** Add an item (by variantId or product slug/size/color) to the server cart. */
export async function addToCart({ productId, variantId, slug, name, image, size, color, price, quantity = 1 }) {
  if (!API_URL) return null;
  const res = await apiFetch("/cart/items", {
    method: "POST",
    body: JSON.stringify({
      productId,
      variantId,
      slug,
      name,
      image,
      size,
      color,
      price,
      quantity,
    }),
  });
  return res?.data || null;
}

/** Update a cart item's quantity or variant options. */
export async function updateCartItem(itemId, updates) {
  if (!API_URL) return null;
  const payload = typeof updates === "number" ? { quantity: updates } : updates;
  const res = await apiFetch(`/cart/items/${encodeURIComponent(itemId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return res?.data || null;
}

/** Remove an item from the server cart. */
export async function removeCartItem(itemId) {
  if (!API_URL) return null;
  const res = await apiFetch(`/cart/items/${encodeURIComponent(itemId)}`, {
    method: "DELETE",
  });
  return res?.data || null;
}

/** Clear the entire server cart. */
export async function clearCartAPI() {
  if (!API_URL) return null;
  const res = await apiFetch("/cart", { method: "DELETE" });
  return res?.data || null;
}
