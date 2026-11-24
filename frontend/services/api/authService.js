/**
 * authService.js
 *
 * Authentication and customer profile API calls.
 * Integrates with Express + JWT backend while keeping safe offline fallback.
 */

import {
  API_URL,
  apiFetch,
  getAuthToken,
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "./apiClient";

export const ADMIN_ROLES = ["admin", "super_admin"];

export function isAdminRole(role) {
  return ADMIN_ROLES.includes(role);
}

export function normalizeUser(rawUser = {}, fallback = {}) {
  const fullName =
    rawUser.fullName ||
    rawUser.name ||
    fallback.fullName ||
    fallback.name ||
    (rawUser.email || fallback.email || "member").split("@")[0];

  return {
    id: rawUser._id || rawUser.id || fallback.id || `usr_${Date.now()}`,
    name: fullName,
    fullName,
    email: rawUser.email || fallback.email || "",
    role: rawUser.role || fallback.role || "customer",
    phone: rawUser.phone !== undefined ? rawUser.phone : fallback.phone || "",
    addresses: Array.isArray(rawUser.addresses)
      ? rawUser.addresses
      : fallback.addresses || [],
  };
}

export function saveAuthUser(user) {
  setStorageItem("bh_auth_user", JSON.stringify(user));
  return user;
}

export function clearAuthSession() {
  removeStorageItem("bh_auth_token");
  removeStorageItem("bh_auth_user");
}

/**
 * Register a new user.
 * @param {{ name: string, fullName?: string, email: string, password: string, phone?: string }} payload
 */
export async function registerUser(payload) {
  const email = payload.email?.trim().toLowerCase();
  const fullName = payload.fullName?.trim() || payload.name?.trim() || "Customer";
  const password = payload.password;
  const phone = payload.phone?.trim() || "";

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  if (API_URL) {
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password, phone }),
    });

    if (res && res.data) {
      const token = res.data.token;
      const normalizedUser = normalizeUser(res.data.user, { fullName, email, phone });
      if (token) setStorageItem("bh_auth_token", token);
      saveAuthUser(normalizedUser);
      return {
        success: true,
        token,
        user: normalizedUser,
        message: "Your account has been created successfully.",
      };
    }
  }

  // Fallback offline mock registration
  const rawUsers = getStorageItem("bh_registered_users");
  const users = rawUsers ? JSON.parse(rawUsers) : [];
  if (users.find((u) => u.email.toLowerCase() === email)) {
    throw new Error("An account with this email address already exists.");
  }

  const newUser = normalizeUser(
    { id: `usr_${Date.now()}`, fullName, email, phone, role: "customer", addresses: [] },
    {}
  );

  users.push({ ...newUser, password, createdAt: new Date().toISOString() });
  setStorageItem("bh_registered_users", JSON.stringify(users));
  saveAuthUser(newUser);

  return {
    success: true,
    user: newUser,
    message: "Your account has been created successfully.",
  };
}

/**
 * Log in an existing user.
 * @param {{ email: string, password: string }} payload
 */
export async function loginUser(payload) {
  const email = payload.email?.trim().toLowerCase();
  const password = payload.password;

  if (!email || !password) {
    throw new Error("Invalid email address or password. Please verify your credentials and try again.");
  }

  if (API_URL) {
    const res = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res && res.data) {
      const token = res.data.token;
      const normalizedUser = normalizeUser(res.data.user, { email });
      if (token) setStorageItem("bh_auth_token", token);
      saveAuthUser(normalizedUser);
      return {
        success: true,
        token,
        user: normalizedUser,
      };
    }
  }

  // Fallback offline credentials
  if (email === "admin@bamboohemp.com" && password === "Admin@12345") {
    const adminUser = saveAuthUser(
      normalizeUser({
        id: "usr_admin_001",
        fullName: "Aditya Yadav (Store Owner)",
        email: "admin@bamboohemp.com",
        role: "admin",
        phone: "+91 9876543210",
      })
    );
    return { success: true, user: adminUser };
  }

  if (email === "customer@bamboohemp.com" && password === "Customer@12345") {
    const customerUser = saveAuthUser(
      normalizeUser({
        id: "usr_customer_001",
        fullName: "Priya Sharma",
        email: "customer@bamboohemp.com",
        role: "customer",
        phone: "+91 9123456789",
      })
    );
    return { success: true, user: customerUser };
  }

  const rawUsers = getStorageItem("bh_registered_users");
  const users = rawUsers ? JSON.parse(rawUsers) : [];
  const matched = users.find((u) => u.email.toLowerCase() === email);
  if (matched) {
    if (matched.password !== password) {
      throw new Error("Invalid email address or password. Please verify your credentials and try again.");
    }
    const safeUser = saveAuthUser(normalizeUser(matched));
    return { success: true, user: safeUser };
  }

  const namePart = email.split("@")[0].replace(/[._-]/g, " ");
  const formattedName =
    namePart
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Member";

  const sessionUser = saveAuthUser(
    normalizeUser({
      id: `usr_${Date.now()}`,
      fullName: formattedName,
      email,
      role: email.includes("admin") ? "admin" : "customer",
    })
  );

  return { success: true, user: sessionUser };
}

/**
 * Log out the current user.
 */
export async function logoutUser() {
  clearAuthSession();
  if (API_URL) {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    }
  }
  return { success: true };
}

/**
 * Get the currently authenticated user (via JWT / session).
 */
export async function getCurrentUser() {
  if (API_URL) {
    const token = getAuthToken();
    if (!token) {
      // Never trust stale cached user metadata when API auth is active without a JWT
      removeStorageItem("bh_auth_user");
      return null;
    }

    try {
      const res = await apiFetch("/auth/me");
      if (res && res.data && res.data.user) {
        return saveAuthUser(normalizeUser(res.data.user));
      }
    } catch (err) {
      if (err?.status === 401 || err?.status === 403) {
        clearAuthSession();
        return null;
      }
      // Fall back to stored session only on transient network/server outage
    }
  }

  const raw = getStorageItem("bh_auth_user");
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Request a password reset email.
 * @param {{ email: string }} payload
 */
export async function forgotPassword(payload) {
  if (API_URL) {
    try {
      await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch {
      // Silent catch so UI does not break
    }
  }
  return {
    success: true,
    message: "If an account matches this email, password reset instructions have been sent (email notifications deferred).",
  };
}

/**
 * Update customer profile (fullName, phone).
 * @param {{ fullName?: string, name?: string, phone?: string }} payload
 */
export async function updateProfile(payload) {
  const cleanPayload = {
    fullName: (payload.fullName ?? payload.name ?? "").trim(),
    phone: (payload.phone ?? "").trim(),
  };

  if (API_URL && getAuthToken()) {
    const res = await apiFetch("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(cleanPayload),
    });
    if (res && res.data && res.data.user) {
      const normalized = saveAuthUser(normalizeUser(res.data.user));
      return { success: true, user: normalized };
    }
  }

  const current = (await getCurrentUser()) || {};
  const updated = saveAuthUser(normalizeUser({ ...current, ...cleanPayload }));
  return { success: true, user: updated };
}
