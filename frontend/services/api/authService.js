/**
 * authService.js
 *
 * Authentication API calls: register, login, logout, get current user.
 * Frontend integration point — backend will use JWT + Express.
 * Never store JWT secrets or private keys here.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to access localStorage safely in SSR environments
function getStorageItem(key) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageItem(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or access errors
  }
}

function removeStorageItem(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Send cookies (for httpOnly JWT cookies from backend)
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Auth error: ${res.status}`);
  return data;
}

/**
 * Register a new user.
 * @param {{ name: string, email: string, password: string }} payload
 */
export async function registerUser(payload) {
  if (!API_URL) {
    const rawUsers = getStorageItem("bh_registered_users");
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    const existing = users.find(
      (u) => u.email.toLowerCase() === payload.email.toLowerCase()
    );
    if (existing) {
      throw new Error("An account with this email address already exists.");
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    users.push({ ...newUser, password: payload.password });
    setStorageItem("bh_registered_users", JSON.stringify(users));
    setStorageItem("bh_auth_user", JSON.stringify(newUser));

    return {
      success: true,
      user: newUser,
      message: "Your account has been created successfully.",
    };
  }

  return fetchAPI("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Log in an existing user.
 * @param {{ email: string, password: string }} payload
 */
export async function loginUser(payload) {
  if (!API_URL) {
    const email = payload.email?.trim().toLowerCase();
    const password = payload.password;

    if (!email || !password || password.length < 6) {
      throw new Error("Invalid email address or password. Please verify your credentials and try again.");
    }

    const rawUsers = getStorageItem("bh_registered_users");
    const users = rawUsers ? JSON.parse(rawUsers) : [];

    const matched = users.find((u) => u.email.toLowerCase() === email);
    if (matched) {
      if (matched.password !== password) {
        throw new Error("Invalid email address or password. Please verify your credentials and try again.");
      }
      const safeUser = { id: matched.id, name: matched.name, email: matched.email };
      setStorageItem("bh_auth_user", JSON.stringify(safeUser));
      return { success: true, user: safeUser };
    }

    // Default seamless account access for any valid login
    const namePart = email.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = namePart
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") || "Member";

    const sessionUser = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email: email,
    };

    setStorageItem("bh_auth_user", JSON.stringify(sessionUser));
    return {
      success: true,
      user: sessionUser,
    };
  }

  return fetchAPI("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Log out the current user.
 */
export async function logoutUser() {
  if (!API_URL) {
    removeStorageItem("bh_auth_user");
    return { success: true };
  }
  return fetchAPI("/auth/logout", { method: "POST" });
}

/**
 * Get the currently authenticated user (via cookie / session).
 */
export async function getCurrentUser() {
  if (!API_URL) {
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
  try {
    return await fetchAPI("/auth/me");
  } catch {
    return null; // Not authenticated
  }
}

/**
 * Request a password reset email.
 * @param {{ email: string }} payload
 */
export async function forgotPassword(payload) {
  if (!API_URL) {
    return {
      success: true,
      message: "If an account matches this email, password reset instructions have been sent.",
    };
  }
  return fetchAPI("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Update user profile.
 * @param {Object} payload
 */
export async function updateProfile(payload) {
  if (!API_URL) {
    const current = (await getCurrentUser()) || {};
    const updated = { ...current, ...payload };
    setStorageItem("bh_auth_user", JSON.stringify(updated));
    return { success: true, user: updated };
  }
  return fetchAPI("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
