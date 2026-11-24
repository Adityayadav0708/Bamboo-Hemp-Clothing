/**
 * orderService.js
 *
 * Order-related API calls: place order, get order history, get order detail.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// MOCK ORDER DATA – Replace with real API responses.
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
      name: "Demo User",
      addressLine1: "42, MG Road",
      addressLine2: "Koramangala",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560034",
      country: "India",
      phone: "9999999999",
    },
    paymentMethod: "Online Payment (Placeholder)",
    paymentStatus: "Paid",
    trackingNumber: null,
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
      name: "Demo User",
      addressLine1: "42, MG Road",
      addressLine2: "Koramangala",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560034",
      country: "India",
      phone: "9999999999",
    },
    paymentMethod: "Online Payment (Placeholder)",
    paymentStatus: "Paid",
    trackingNumber: null,
    subtotal: 1499,
    shippingCost: 0,
  },
];

async function fetchAPI(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Order API error: ${res.status}`);
  return data;
}

/** Get all orders for the logged-in user. */
export async function getUserOrders() {
  if (!API_URL) return MOCK_ORDERS;
  return fetchAPI("/orders");
}

/** Get a single order by ID. */
export async function getOrderById(orderId) {
  if (!API_URL) {
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found (mock).");
    return order;
  }
  return fetchAPI(`/orders/${orderId}`);
}

/**
 * Place a new order.
 * @param {Object} orderPayload - { items, shippingAddress, paymentMethod }
 */
export async function placeOrder(orderPayload) {
  if (!API_URL) {
    console.warn("[orderService] Mock place order. No real order created.");
    return {
      success: true,
      orderId: `ORD-MOCK-${Date.now()}`,
      message: "Order placed successfully (mock — no real transaction).",
    };
  }
  return fetchAPI("/orders", {
    method: "POST",
    body: JSON.stringify(orderPayload),
  });
}
