/**
 * apiClient.js
 *
 * Shared REST fetch helper, JWT token lookup, and persistent guest token
 * generator used across frontend API services.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getStorageItem(key) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or access errors
  }
}

export function removeStorageItem(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export function getAuthToken() {
  return getStorageItem("bh_auth_token");
}

export function getOrCreateGuestToken() {
  if (typeof window === "undefined") return "ssr_guest";
  const existing = getStorageItem("bh_guest_token");
  if (existing) return existing;
  const generated = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  setStorageItem("bh_guest_token", generated);
  return generated;
}

export async function apiFetch(endpoint, options = {}) {
  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }

  const token = getAuthToken();
  const guestToken = getOrCreateGuestToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(guestToken ? { "X-Guest-Token": guestToken } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = data.error?.message || data.message || `API error: ${res.status}`;
    const err = new Error(errorMsg);
    err.status = res.status;
    err.code = data.error?.code;
    throw err;
  }
  return data;
}
