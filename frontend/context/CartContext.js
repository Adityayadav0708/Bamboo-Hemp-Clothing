"use client";

/**
 * CartContext.js
 *
 * Global cart state using React Context API.
 *
 * WHY Context API (not Redux/Zustand)?
 * → Cart is the only global state needed at this scale.
 * → Context + useReducer covers it cleanly with zero extra dependencies.
 * → Can be migrated to Zustand later if complexity grows.
 *
 * Cart persists to localStorage so items survive page refresh.
 */

import { createContext, useContext, useReducer, useEffect } from "react";
import { getProductBySlug } from "@/data/products";

// ── Action Types ──────────────────────────────────────────────────────────────
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  UPDATE_VARIANT: "UPDATE_VARIANT",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeCartKey(productId, size, color) {
  return `${productId}__${size}__${color}`;
}

// ── Reducer ───────────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload };

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity, size, color } = action.payload;
      const key = makeCartKey(product.id, size, color);
      const existingIndex = state.items.findIndex(
        (item) => item.cartKey === key
      );

      if (existingIndex >= 0) {
        // Item already in cart — increase quantity
        const updatedItems = state.items.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      // New item
      const pData = getProductBySlug(product.slug) || product;
      const validImg =
        pData?.images?.[0] ||
        product.images?.[0] ||
        product.image ||
        "/images/products/heelium-men-tee-black.png";

      const newItem = {
        cartKey: key,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: validImg,
        size,
        color,
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
            ? { ...item, quantity: Math.min(quantity, item.maxQty) }
            : item
        ),
      };
    }

    case CART_ACTIONS.UPDATE_VARIANT: {
      const { cartKey, newSize, newColor } = action.payload;
      const target = state.items.find((item) => item.cartKey === cartKey);
      if (!target) return state;

      const updatedSize = newSize || target.size;
      const updatedColor = newColor || target.color;
      const newKey = makeCartKey(target.productId, updatedSize, updatedColor);

      // If key didn't change, no-op
      if (newKey === cartKey) return state;

      const existingIndex = state.items.findIndex((item) => item.cartKey === newKey);
      if (existingIndex >= 0) {
        // Merge item quantity
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
      return { ...state, items: [] };

    default:
      return state;
  }
}

// ── Initial State ─────────────────────────────────────────────────────────────
const initialState = { items: [] };

// ── Context ───────────────────────────────────────────────────────────────────
const CartContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount & heal any outdated or missing image paths
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bh_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const healed = parsed.map((item) => {
            const p = getProductBySlug(item.slug);
            const validImg =
              p?.images?.[0] ||
              (item.image && !item.image.includes("placeholder")
                ? item.image
                : "/images/products/heelium-men-tee-black.png");
            return {
              ...item,
              name: p?.name || item.name,
              price: p?.price || item.price,
              image: validImg,
            };
          });
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: healed });
          return;
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("bh_cart", JSON.stringify(state.items));
    } catch {
      // Ignore storage errors (e.g., private mode)
    }
  }, [state.items]);

  // ── Derived Values ──────────────────────────────────────────────────────────
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ── Actions ─────────────────────────────────────────────────────────────────
  function addItem(product, quantity = 1, size, color) {
    if (!size || !color) {
      console.warn("[CartContext] addItem called without size or color.");
      return false;
    }
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, size, color },
    });
    return true;
  }

  function removeItem(cartKey) {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: cartKey });
  }

  function updateQuantity(cartKey, quantity) {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartKey, quantity },
    });
  }

  function updateVariant(cartKey, newSize, newColor) {
    dispatch({
      type: CART_ACTIONS.UPDATE_VARIANT,
      payload: { cartKey, newSize, newColor },
    });
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }

  const value = {
    items: state.items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    updateVariant,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
