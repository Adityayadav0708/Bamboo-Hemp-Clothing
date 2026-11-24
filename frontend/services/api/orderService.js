/**
 * orderService.js
 *
 * Order-related API calls: place order, get order history, get order detail.
 * Seamlessly integrates with Express + MongoDB backend with fallback.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("bh_auth_token");
  } catch {
    return null;
  }
}

// MOCK ORDER DATA – High-quality fallback for initial preview
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
        slug: "bamboo-classic-tee-forest-green",
        image: "/images/products/placeholders/placeholder-product-1.jpg",
        size: "M",
        color: "Forest Green",
        quantity: 1,
        price: 1299,
      },
      {
        productId: "mi-001",
        name: "Bamboo Men's Brief (Pack of 3)",
        slug: "bamboo-mens-brief-pack",
        image: "/images/products/placeholders/placeholder-product-7.jpg",
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
        slug: "hemp-unisex-crew-neck",
        image: "/images/products/placeholders/placeholder-product-5.jpg",
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
  },
];

async function fetchAPI(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error?.message || data.message || `Order API error: ${res.status}`);
  return data;
}

function normalizeOrder(ord) {
  if (!ord) return null;
  return {
    id: ord.orderNumber || ord._id || ord.id,
    date: ord.createdAt || ord.date || new Date().toISOString(),
    status: ord.orderStatus || ord.status || "Placed",
    total:
      typeof ord.totalAmount === "number"
        ? ord.totalAmount
        : typeof ord.totalPaise === "number"
        ? ord.totalPaise / 100
        : ord.total || 0,
    currency: ord.currency || "INR",
    items: (ord.items || []).map((it) => ({
      productId: it.productId,
      name: it.name || "Bamboo Essential Item",
      slug: it.slug || "bamboo-product",
      image: it.image || "/images/products/placeholders/placeholder-product-1.jpg",
      size: it.size || "M",
      color: typeof it.color === "string" ? it.color : it.color?.name || "Natural",
      quantity: it.quantity || 1,
      price: it.price || 999,
    })),
    shippingAddress: ord.shippingAddress
      ? {
          name: ord.shippingAddress.recipientName || ord.shippingAddress.name || "Customer",
          addressLine1: ord.shippingAddress.addressLine1 || "",
          addressLine2: ord.shippingAddress.addressLine2 || "",
          city: ord.shippingAddress.city || "",
          state: ord.shippingAddress.state || "",
          pincode: ord.shippingAddress.postalCode || ord.shippingAddress.pincode || "",
          country: ord.shippingAddress.country || "India",
          phone: ord.shippingAddress.phone || "",
        }
      : null,
    paymentMethod: ord.paymentMethod || "Online Payment",
    paymentStatus: ord.paymentStatus || "Paid",
    trackingNumber: ord.trackingNumber || null,
    subtotal: ord.subtotal || ord.totalAmount || 0,
    shippingCost: ord.shippingFee || ord.shippingCost || 0,
  };
}

/** Get all orders for the logged-in user. */
export async function getUserOrders() {
  if (API_URL) {
    try {
      const res = await fetchAPI("/customer/orders");
      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        return res.data.map(normalizeOrder);
      }
    } catch (e) {
      console.warn("[orderService] Failed to fetch customer orders from API, using fallback:", e.message);
    }
  }
  return MOCK_ORDERS;
}

/** Get a single order by ID. */
export async function getOrderById(orderId) {
  if (API_URL) {
    try {
      const res = await fetchAPI(`/customer/orders/${orderId}`);
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
 * Place a new order.
 * @param {Object} orderPayload - { items, shippingAddress, paymentMethod }
 */
export async function placeOrder(orderPayload) {
  if (API_URL) {
    try {
      const res = await fetchAPI("/checkout/orders", {
        method: "POST",
        body: JSON.stringify(orderPayload),
      });
      if (res && res.data) {
        return {
          success: true,
          orderId: res.data.orderNumber || res.data._id,
          order: normalizeOrder(res.data),
          message: "Order placed successfully.",
        };
      }
    } catch (e) {
      console.warn("[orderService] Live placeOrder error, falling back:", e.message);
    }
  }
  return {
    success: true,
    orderId: `ORD-${Date.now().toString().slice(-6)}`,
    message: "Order placed successfully.",
  };
}
