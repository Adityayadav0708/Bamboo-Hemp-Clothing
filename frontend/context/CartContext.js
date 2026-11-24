"use client";

/**
 * CartContext.js
 *
 * Global cart state using React Context API + useReducer.
 * Persists locally to localStorage and syncs with the Express /api/v1/cart APIs
 * across guest sessions and authenticated customer logins.
 */

import { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { getProductBySlug } from "@/data/products";
import { useAuth } from "@/hooks/useAuth";
import * as cartService from "@/services/api/cartService";
import { API_URL } from "@/services/api/apiClient";

const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  UPDATE_VARIANT: "UPDATE_VARIANT",
  SET_COUPON: "SET_COUPON",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

function toColorSlug(val = "") {
  return val.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeCartKey(slugOrId, size, color) {
  return `${slugOrId}__${size}__${toColorSlug(color)}`;
}

function normalizeServerCartItem(it) {
  const slug = it.slug || it.productSlug || "";
  const p = slug ? getProductBySlug(slug) : null;
  const colorSlug = toColorSlug(it.color || it.colorName || p?.colors?.[0]?.slug || "natural");
  const key = makeCartKey(slug || it.productId, it.size || "M", colorSlug);
  const validImg =
    p?.images?.[0] ||
    (it.image && !it.image.includes("placeholder") ? it.image : null) ||
    "/images/products/heelium-men-tee-black.png";

  return {
    cartKey: it.cartKey || key,
    itemId: it.itemId || it.variantId || key,
    productId: it.productId || p?.id || slug,
    variantId: it.variantId || undefined,
    slug: slug || p?.slug || "",
    name: it.name || p?.name || "Bamboo Essential",
    price: Number(it.price || p?.price || 990),
    image: validImg,
    size: it.size || "M",
    color: colorSlug,
    quantity: Number(it.quantity || 1),
    maxQty: 10,
  };
}

function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART: {
      if (Array.isArray(action.payload)) {
        return { ...state, items: action.payload };
      }
      return {
        ...state,
        items: action.payload.items ?? state.items,
        couponCode: action.payload.couponCode !== undefined ? action.payload.couponCode : state.couponCode,
      };
    }

    case CART_ACTIONS.SET_COUPON:
      return { ...state, couponCode: action.payload || "" };

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, size, color } = action.payload;
      const colorSlug = toColorSlug(color);
      const key = makeCartKey(product.slug || product.id, size, colorSlug);
      const existingIndex = state.items.findIndex((item) => item.cartKey === key);

      if (existingIndex >= 0) {
        const updatedItems = state.items.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.maxQty || 10) }
            : item
        );
        return { ...state, items: updatedItems };
      }

      const pData = getProductBySlug(product.slug) || product;
      const validImg =
        pData?.images?.[0] ||
        product.images?.[0] ||
        product.image ||
        "/images/products/heelium-men-tee-black.png";

      const newItem = {
        cartKey: key,
        itemId: product.variantId || key,
        productId: product.id || product._id,
        variantId: product.variantId,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: validImg,
        size,
        color: colorSlug,
        quantity,
        maxQty: 10,
      };
      return { ...state, items: [...state.items, newItem] };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.cartKey !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartKey, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.cartKey !== cartKey),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: Math.min(quantity, item.maxQty || 10) }
            : item
        ),
      };
    }

    case CART_ACTIONS.UPDATE_VARIANT: {
      const { cartKey, newSize, newColor } = action.payload;
      const target = state.items.find((item) => item.cartKey === cartKey);
      if (!target) return state;

      const updatedSize = newSize || target.size;
      const updatedColor = toColorSlug(newColor || target.color);
      const newKey = makeCartKey(target.slug || target.productId, updatedSize, updatedColor);

      if (newKey === cartKey) return state;

      const existingIndex = state.items.findIndex((item) => item.cartKey === newKey);
      if (existingIndex >= 0) {
        return {
          ...state,
          items: state.items
            .filter((item) => item.cartKey !== cartKey)
            .map((item) =>
              item.cartKey === newKey
                ? { ...item, quantity: Math.min(item.quantity + target.quantity, 10) }
                : item
            ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.cartKey === cartKey
            ? { ...item, cartKey: newKey, size: updatedSize, color: updatedColor }
            : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { items: [], couponCode: "" };

    default:
      return state;
  }
}

const initialState = { items: [], couponCode: "" };
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, loading: authLoading } = useAuth();
  const itemsRef = useRef([]);
  const hasLoadedStorageRef = useRef(false);
  const prevUserIdRef = useRef(undefined);

  // 1. Load localStorage cart immediately on mount & migrate legacy cartKeys
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bh_cart");
      const savedCoupon = localStorage.getItem("bh_cart_coupon") || "";
      const parsed = saved ? JSON.parse(saved) : null;
      const healed = Array.isArray(parsed) ? parsed.map(normalizeServerCartItem) : [];
      itemsRef.current = healed;
      if (healed.length > 0 || savedCoupon) {
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: { items: healed, couponCode: savedCoupon },
        });
      }
    } catch {
      // Ignore storage errors
    } finally {
      hasLoadedStorageRef.current = true;
    }
  }, []);

  // 2. Keep ref and localStorage in sync with state
  useEffect(() => {
    itemsRef.current = state.items;
    if (!hasLoadedStorageRef.current) return;
    try {
      localStorage.setItem("bh_cart", JSON.stringify(state.items));
    } catch {
      // Ignore storage errors
    }
  }, [state.items]);

  useEffect(() => {
    if (!hasLoadedStorageRef.current) return;
    try {
      if (state.couponCode) {
        localStorage.setItem("bh_cart_coupon", state.couponCode);
      } else {
        localStorage.removeItem("bh_cart_coupon");
      }
    } catch {
      // Ignore storage errors
    }
  }, [state.couponCode]);

  // 3. Synchronize cart with backend when auth session settles, user logs in, or logs out
  useEffect(() => {
    if (authLoading) return;
    const currentUserId = user?.id || null;
    const previousUserId = prevUserIdRef.current;
    prevUserIdRef.current = currentUserId;

    if (previousUserId && !currentUserId) {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      try {
        localStorage.removeItem("bh_cart");
        localStorage.removeItem("bh_cart_coupon");
      } catch {}
      return;
    }

    if (!API_URL) return;

    let cancelled = false;
    async function syncWithServer() {
      try {
        const localItems = itemsRef.current || [];
        let serverCart = null;

        if (currentUserId && previousUserId === null && localItems.length > 0) {
          serverCart = await cartService.syncCart(localItems);
        } else {
          serverCart = await cartService.getCart();
          if (
            !currentUserId &&
            serverCart &&
            (!serverCart.items || serverCart.items.length === 0) &&
            localItems.length > 0
          ) {
            serverCart = await cartService.syncCart(localItems);
          }
        }

        if (!cancelled && serverCart && Array.isArray(serverCart.items)) {
          dispatch({
            type: CART_ACTIONS.LOAD_CART,
            payload: serverCart.items.map(normalizeServerCartItem),
          });
        }
      } catch {
        // Keep local cart intact when backend is unreachable
      }
    }

    syncWithServer();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id]);

  const applyServerCartIfPresent = (serverCart) => {
    if (serverCart && Array.isArray(serverCart.items)) {
      dispatch({
        type: CART_ACTIONS.LOAD_CART,
        payload: serverCart.items.map(normalizeServerCartItem),
      });
    }
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function addItem(product, quantity = 1, size, color) {
    if (!size || !color) {
      console.warn("[CartContext] addItem called without size or color.");
      return false;
    }

    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, size, color },
    });

    if (API_URL) {
      const pData = getProductBySlug(product.slug) || product;
      const validImg =
        pData?.images?.[0] ||
        product.images?.[0] ||
        product.image ||
        "/images/products/heelium-men-tee-black.png";

      cartService
        .addToCart({
          productId: product.id || product._id,
          variantId: product.variantId,
          slug: product.slug,
          name: product.name,
          image: validImg,
          size,
          color: toColorSlug(color),
          price: product.price,
          quantity,
        })
        .then(applyServerCartIfPresent)
        .catch(() => {});
    }

    return true;
  }

  function removeItem(cartKey) {
    const target = state.items.find((item) => item.cartKey === cartKey);
    const serverId = target?.variantId || target?.itemId || cartKey;
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: cartKey });

    if (API_URL) {
      cartService
        .removeCartItem(serverId)
        .then(applyServerCartIfPresent)
        .catch(() => {});
    }
  }

  function updateQuantity(cartKey, quantity) {
    const target = state.items.find((item) => item.cartKey === cartKey);
    const serverId = target?.variantId || target?.itemId || cartKey;
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartKey, quantity },
    });

    if (API_URL) {
      cartService
        .updateCartItem(serverId, { quantity })
        .then(applyServerCartIfPresent)
        .catch(() => {});
    }
  }

  function updateVariant(cartKey, newSize, newColor) {
    const target = state.items.find((item) => item.cartKey === cartKey);
    const serverId = target?.variantId || target?.itemId || cartKey;
    dispatch({
      type: CART_ACTIONS.UPDATE_VARIANT,
      payload: { cartKey, newSize, newColor },
    });

    if (API_URL) {
      cartService
        .updateCartItem(serverId, {
          newSize,
          newColor: newColor ? toColorSlug(newColor) : undefined,
        })
        .then(applyServerCartIfPresent)
        .catch(() => {});
    }
  }

  function setCouponCode(code) {
    dispatch({ type: CART_ACTIONS.SET_COUPON, payload: code });
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    if (API_URL) {
      cartService.clearCartAPI().catch(() => {});
    }
  }

  const value = {
    items: state.items,
    itemCount,
    subtotal,
    couponCode: state.couponCode,
    setCouponCode,
    addItem,
    removeItem,
    updateQuantity,
    updateVariant,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
