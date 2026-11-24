/**
 * addressService.js
 *
 * Customer saved addresses CRUD API calls synced with /api/v1/customer/addresses.
 */

import { API_URL, apiFetch, getAuthToken } from "./apiClient";

export async function getAddresses() {
  if (!API_URL || !getAuthToken()) return null;
  const res = await apiFetch("/customer/addresses");
  return res?.data || [];
}

export async function addAddress(payload) {
  const res = await apiFetch("/customer/addresses", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function updateAddress(addressId, payload) {
  const res = await apiFetch(`/customer/addresses/${encodeURIComponent(addressId)}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return res?.data;
}

export async function deleteAddress(addressId) {
  const res = await apiFetch(`/customer/addresses/${encodeURIComponent(addressId)}`, {
    method: "DELETE",
  });
  return res?.data;
}
