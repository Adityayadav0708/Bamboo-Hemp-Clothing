/**
 * cartService.js
 *
 * Cart API calls for syncing cart with the backend.
 * During development the CartContext manages cart client-side only.
 * When backend is ready these functions are called to sync.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Cart API error: ${res.status}`);
  return data;
}

/** Fetch the user's server-side cart (after login). */
export async function getCart() {
  if (!API_URL) return null; // Client-side cart only in mock mode
  return fetchAPI("/cart");
}

/** Add an item to the cart. */
export async function addToCart({ productId, quantity, size, color }) {
  if (!API_URL) return null;
  return fetchAPI("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity, size, color }),
  });
}

/** Update a cart item's quantity. */
export async function updateCartItem(itemId, quantity) {
  if (!API_URL) return null;
  return fetchAPI(`/cart/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

/** Remove an item from the cart. */
export async function removeCartItem(itemId) {
  if (!API_URL) return null;
  return fetchAPI(`/cart/${itemId}`, { method: "DELETE" });
}

/** Clear the entire cart. */
export async function clearCart() {
  if (!API_URL) return null;
  return fetchAPI("/cart", { method: "DELETE" });
}
