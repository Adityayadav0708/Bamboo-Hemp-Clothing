/**
 * orderService.js
 *
 * Order-related API calls: quote calculation, live order creation,
 * customer order history, and order details.
 */

import { API_URL, apiFetch, getAuthToken } from "./apiClient";

const MOCK_ORDERS = [
  {
    id: "ORD-20241101-001",
    date: "2024-11-01T10:30:00Z",
    status: "Delivered",
    total: 2998,
    currency: "INR",
    items: [
      {
        productId: "bt-001",
        name: "Bamboo Classic Tee",
        slug: "bamboo-round-neck-tshirt-men",
        image: "/images/products/heelium-men-tee-black.png",
        size: "M",
        color: "Forest Green",
        quantity: 1,
        price: 1299,
      },
      {
        productId: "mi-001",
        name: "Bamboo Men's Brief (Pack of 3)",
        slug: "bamboo-underwear-trunk-men-pack3",
        image: "/images/products/heelium-men-trunk-pack3.jpg",
        size: "M",
        color: "Charcoal",
        quantity: 1,
        price: 1799,
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      addressLine1: "42 Lotus Enclave",
      addressLine2: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      country: "India",
      phone: "+91 9123456789",
    },
    paymentMethod: "Online Payment (Razorpay)",
    paymentStatus: "Paid",
    trackingNumber: "TRK-IN-982341",
    subtotal: 2998,
    shippingCost: 0,
    codFee: 0,
    discount: 0,
  },
  {
    id: "ORD-20241115-002",
    date: "2024-11-15T14:00:00Z",
    status: "Processing",
    total: 1499,
    currency: "INR",
    items: [
      {
        productId: "ht-001",
        name: "Hemp Unisex Crew Neck",
        slug: "heritage-hemp-boxy-tee",
        image: "/images/home/bestseller_2.png",
        size: "L",
        color: "Natural",
        quantity: 1,
        price: 1499,
      },
    ],
    shippingAddress: {
      name: "Priya Sharma",
      addressLine1: "42 Lotus Enclave",
      addressLine2: "Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      country: "India",
      phone: "+91 9123456789",
    },
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    trackingNumber: null,
    subtotal: 1499,
    shippingCost: 0,
    codFee: 0,
    discount: 0,
  },
];

export function normalizeOrder(ord) {
  if (!ord) return null;
  const rawItems = ord.items || ord.itemsSnapshot || [];
  const rawAddress = ord.shippingAddress || ord.addressSnapshot;

  return {
    id: ord.orderNumber || ord._id || ord.id,
    _id: ord._id || ord.id,
    date: ord.createdAt || ord.date || new Date().toISOString(),
    status: ord.orderStatus || ord.status || "Placed",
    total:
      typeof ord.totalAmount === "number"
        ? ord.totalAmount
        : typeof ord.totalPaise === "number"
        ? ord.totalPaise / 100
        : ord.total || 0,
    currency: ord.currency || "INR",
    items: rawItems.map((it) => ({
      productId: (it.productId || "").toString(),
      name: it.name || "Bamboo Essential Item",
      slug: it.slug || "bamboo-round-neck-tshirt-men",
      image: it.image || "/images/products/heelium-men-tee-black.png",
      size: it.size || "M",
      color: typeof it.color === "string" ? it.color : it.colour || it.color?.name || "Natural",
      quantity: it.quantity || 1,
      price:
        it.price !== undefined
          ? it.price
          : it.unitPriceRupees !== undefined
          ? it.unitPriceRupees
          : 990,
    })),
    shippingAddress: rawAddress
      ? {
          name: rawAddress.recipientName || rawAddress.name || "Customer",
          addressLine1: rawAddress.addressLine1 || "",
          addressLine2: rawAddress.addressLine2 || "",
          city: rawAddress.city || "",
          state: rawAddress.state || "",
          pincode: rawAddress.postalCode || rawAddress.pincode || "",
          country: rawAddress.country || "India",
          phone: rawAddress.phone || "",
        }
      : null,
    paymentMethod: ord.paymentMethod || "Cash on Delivery",
    paymentStatus: ord.paymentStatus || "Pending",
    deliveryMethod: ord.deliveryMethod || "standard",
    trackingNumber: ord.trackingNumber || null,
    subtotal:
      ord.subtotal !== undefined
        ? ord.subtotal
        : ord.subtotalRupees !== undefined
        ? ord.subtotalRupees
        : ord.totalAmount || 0,
    shippingCost:
      ord.shippingFee !== undefined
        ? ord.shippingFee
        : ord.shippingFeeRupees !== undefined
        ? ord.shippingFeeRupees
        : ord.shippingCost || 0,
    codFee: ord.codFee || 0,
    discount: ord.discount || ord.discountRupees || 0,
  };
}

/** Calculate authoritative checkout quote from the backend. */
export async function getCheckoutQuote({ items, couponCode = "", deliveryMethod = "standard", paymentMethod = "" }) {
  if (!API_URL) return null;
  const res = await apiFetch("/checkout/quote", {
    method: "POST",
    body: JSON.stringify({ items, couponCode, deliveryMethod, paymentMethod }),
  });
  return res?.data || null;
}

/** Get all orders for the currently logged-in user. */
export async function getUserOrders() {
  if (API_URL && getAuthToken()) {
    try {
      const res = await apiFetch("/customer/orders");
      if (res && res.success && Array.isArray(res.data)) {
        return res.data.map(normalizeOrder);
      }
    } catch (e) {
      console.warn("[orderService] Failed to fetch customer orders from API:", e.message);
    }
  }
  return API_URL && getAuthToken() ? [] : MOCK_ORDERS;
}

/** Get a single order by orderNumber or _id. */
export async function getOrderById(orderId) {
  if (API_URL) {
    try {
      const res = await apiFetch(`/customer/orders/${encodeURIComponent(orderId)}`);
      if (res && res.data) {
        return normalizeOrder(res.data);
      }
    } catch (e) {
      console.warn("[orderService] Failed to fetch order by ID from API, checking fallback:", e.message);
    }
  }
  const order = MOCK_ORDERS.find((o) => o.id === orderId);
  if (!order) throw new Error("Order not found.");
  return order;
}

/**
 * Place a live order via POST /api/v1/checkout/orders.
 * @param {Object} orderPayload
 */
export async function placeOrder(orderPayload) {
  const rawAddress = orderPayload.address || orderPayload.shippingAddress || {};

  const backendPayload = {
    items: (orderPayload.items || []).map((it) => ({
      productId: it.productId,
      variantId: it.variantId,
      slug: it.slug,
      name: it.name,
      image: it.image,
      size: it.size,
      color: it.color,
      price: it.price,
      quantity: it.quantity,
    })),
    guestEmail: orderPayload.guestEmail || rawAddress.email || undefined,
    address: {
      recipientName: rawAddress.recipientName || rawAddress.name || "",
      addressLine1: rawAddress.addressLine1 || "",
      addressLine2: rawAddress.addressLine2 || "",
      city: rawAddress.city || "",
      state: rawAddress.state || "",
      postalCode: rawAddress.postalCode || rawAddress.pincode || "",
      country: rawAddress.country || "India",
      phone: rawAddress.phone || "",
    },
    deliveryMethod: orderPayload.deliveryMethod || "standard",
    paymentMethod: orderPayload.paymentMethod || "cod",
    couponCode: orderPayload.couponCode || "",
    deliveryInstructions: orderPayload.deliveryInstructions || "",
  };

  if (API_URL) {
    const res = await apiFetch("/checkout/orders", {
      method: "POST",
      body: JSON.stringify(backendPayload),
    });

    if (res && res.data) {
      const normalized = normalizeOrder(res.data);
      return {
        success: true,
        isLiveOrder: true,
        orderId: normalized.id,
        order: normalized,
        message: "Order placed successfully.",
      };
    }
  }

  return {
    success: true,
    isLiveOrder: false,
    orderId: `ORD-${Date.now().toString().slice(-6)}`,
    order: {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      shippingAddress: {
        name: backendPayload.address.recipientName,
        addressLine1: backendPayload.address.addressLine1,
        addressLine2: backendPayload.address.addressLine2,
        city: backendPayload.address.city,
        state: backendPayload.address.state,
        pincode: backendPayload.address.postalCode,
        phone: backendPayload.address.phone,
        email: backendPayload.guestEmail,
      },
      total: orderPayload.total || 0,
      paymentMethod: backendPayload.paymentMethod,
      paymentStatus: "Pending",
    },
    message: "Order placed successfully.",
  };
}
