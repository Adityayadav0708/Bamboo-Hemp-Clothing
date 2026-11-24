"use client";

/**
 * AuthContext.js
 *
 * Global authentication state using React Context API.
 * Manages current user, profile updates, saved addresses state sync, and session handling.
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  clearAuthSession,
  getCurrentUser,
  isAdminRole,
  loginUser,
  logoutUser,
  registerUser,
  saveAuthUser,
  updateProfile as updateProfileAPI,
} from "@/services/api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleUnauthorized = () => {
      clearAuthSession();
      setUser(null);
    };
    window.addEventListener("bh:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("bh:unauthorized", handleUnauthorized);
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Always clear local state even if API call fails
    } finally {
      setUser(null);
    }
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const res = await updateProfileAPI(payload);
    if (res?.user) {
      setUser(res.user);
    }
    return res;
  }, []);

  const syncAddresses = useCallback((addresses) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, addresses: Array.isArray(addresses) ? addresses : [] };
      saveAuthUser(updated);
      return updated;
    });
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: isAdminRole(user?.role),
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    syncAddresses,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
