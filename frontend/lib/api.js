// Bamboo & Hemp E-Commerce API Client & Storefront/Admin Service
// Aligned with PRD & ERD v2.0 (Paise integer currency, 9 Mongoose ERD models)

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function formatRupees(paise) {
  if (typeof paise !== "number") return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

// Initial seed store mirroring backend storeService.js
const INITIAL_ADMIN_DATA = {
  kpi: {
    grossSalesPaise: 419720,
    totalOrders: 3,
    pendingFulfillmentCount: 2,
    lowStockCount: 3,
  },
  products: [
    {
      id: "prod-1",
      name: "Bamboo Round Neck T-shirt for Men",
      slug: "bamboo-round-neck-tshirt-men",
      category: "bamboo-tshirts",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 67 }, { material: "Organic Cotton", percentage: 28 }, { material: "Spandex", percentage: 5 }],
      pricePaise: 99000,
      compareAtPricePaise: 199900,
      status: "active",
      image: "/images/products/heelium-men-tee-black.png",
      variantsCount: 5,
      totalStock: 120,
    },
    {
      id: "prod-2",
      name: "Bamboo Polo T-shirt for Men",
      slug: "bamboo-polo-tshirt-men",
      category: "bamboo-tshirts",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 70 }, { material: "Cotton", percentage: 25 }, { material: "Elastane", percentage: 5 }],
      pricePaise: 149900,
      compareAtPricePaise: 249900,
      status: "active",
      image: "/images/products/heelium-men-polo-black.png",
      variantsCount: 4,
      totalStock: 64,
    },
    {
      id: "prod-3",
      name: "Heritage Himalayan Hemp Boxy Tee",
      slug: "heritage-hemp-boxy-tee",
      category: "hemp-tshirts",
      fabricType: "hemp",
      fabricComposition: [{ material: "Himalayan Hemp", percentage: 55 }, { material: "Organic Cotton", percentage: 45 }],
      pricePaise: 149900,
      compareAtPricePaise: 229900,
      status: "active",
      image: "/images/home/bestseller_2.png",
      variantsCount: 4,
      totalStock: 42,
    },
    {
      id: "prod-4",
      name: "Bamboo Underwear Trunk for Men (Pack of 3)",
      slug: "bamboo-underwear-trunk-men-pack3",
      category: "mens-innerwear",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 95 }, { material: "Elastane", percentage: 5 }],
      pricePaise: 129900,
      compareAtPricePaise: 219900,
      status: "active",
      image: "/images/products/heelium-men-trunk-pack3.jpg",
      variantsCount: 5,
      totalStock: 85,
    },
    {
      id: "prod-5",
      name: "Bamboo Underwear Trunk for Men (Single)",
      slug: "bamboo-underwear-trunk-men-pack1",
      category: "mens-innerwear",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 95 }, { material: "Elastane", percentage: 5 }],
      pricePaise: 49900,
      compareAtPricePaise: 79900,
      status: "active",
      image: "/images/products/heelium-men-trunk-black.jpg",
      variantsCount: 5,
      totalStock: 40,
    },
    {
      id: "prod-6",
      name: "Bamboo Bikini Underwear for Women (Pack of 2)",
      slug: "bamboo-bikini-underwear-women-pack2",
      category: "womens-innerwear",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 95 }, { material: "Elastane", percentage: 5 }],
      pricePaise: 79900,
      compareAtPricePaise: 139900,
      status: "active",
      image: "/images/products/heelium-women-bikini-pack2.webp",
      variantsCount: 4,
      totalStock: 52,
    },
    {
      id: "prod-7",
      name: "Bamboo Underwear Brief for Women (Pack of 3)",
      slug: "bamboo-brief-women-pack3",
      category: "womens-innerwear",
      fabricType: "bamboo",
      fabricComposition: [{ material: "Bamboo Viscose", percentage: 95 }, { material: "Elastane", percentage: 5 }],
      pricePaise: 109900,
      compareAtPricePaise: 189900,
      status: "active",
      image: "/images/products/heelium-women-brief-pack3.webp",
      variantsCount: 4,
      totalStock: 38,
    },
  ],
  inventory: [
    {
      id: "var-1",
      sku: "HL-TEE-BLK-S",
      productName: "Bamboo Round Neck T-shirt for Men",
      size: "S",
      colour: "Pitch Black",
      stockQuantity: 4,
      reservedQuantity: 0,
      threshold: 5,
      pricePaise: 99000,
    },
    {
      id: "var-2",
      sku: "HL-TEE-BLK-M",
      productName: "Bamboo Round Neck T-shirt for Men",
      size: "M",
      colour: "Pitch Black",
      stockQuantity: 42,
      reservedQuantity: 3,
      threshold: 5,
      pricePaise: 99000,
    },
    {
      id: "var-3",
      sku: "HMP-TEE-SND-L",
      productName: "Heritage Himalayan Hemp Boxy Tee",
      size: "L",
      colour: "Natural Sand",
      stockQuantity: 3,
      reservedQuantity: 1,
      threshold: 5,
      pricePaise: 149900,
    },
    {
      id: "var-4",
      sku: "HL-TRK-3PK-M",
      productName: "Bamboo Underwear Trunk (Pack of 3)",
      size: "M",
      colour: "Trio Combo",
      stockQuantity: 24,
      reservedQuantity: 0,
      threshold: 5,
      pricePaise: 129900,
    },
    {
      id: "var-5",
      sku: "HL-WBK-2PK-S",
      productName: "Bamboo Bikini Underwear (Pack of 2)",
      size: "S",
      colour: "Blush & Black",
      stockQuantity: 2,
      reservedQuantity: 0,
      threshold: 5,
      pricePaise: 79900,
    },
  ],
  orders: [
    {
      id: "ord-1001",
      orderNumber: "ORD-2026-1001",
      customerName: "Aarav Sharma",
      customerEmail: "aarav.sharma@example.com",
      phone: "+91 98765 43210",
      totalPaise: 259800,
      paymentStatus: "paid",
      orderStatus: "confirmed",
      shippingCity: "Bengaluru, Karnataka",
      itemSummary: "The Essential Bamboo Crew (M) x 2",
      createdAt: "2026-11-22T14:30:00Z",
    },
    {
      id: "ord-1002",
      orderNumber: "ORD-2026-1002",
      customerName: "Meera Nair",
      customerEmail: "meera.nair@example.com",
      phone: "+91 98111 22334",
      totalPaise: 179900,
      paymentStatus: "paid",
      orderStatus: "processing",
      shippingCity: "Mumbai, Maharashtra",
      itemSummary: "Everyday Bamboo Trunk 3-Pack (M) x 1",
      createdAt: "2026-11-22T16:15:00Z",
    },
    {
      id: "ord-1003",
      orderNumber: "ORD-2026-1003",
      customerName: "Vikram Sen",
      customerEmail: "vikram.sen@example.com",
      phone: "+91 99200 88776",
      totalPaise: 149900,
      paymentStatus: "paid",
      orderStatus: "shipped",
      shippingCity: "New Delhi, Delhi",
      itemSummary: "Heritage Hemp Boxy Tee (L) x 1",
      createdAt: "2026-11-21T10:00:00Z",
    },
  ],
  auditLogs: [
    {
      id: "log-1",
      timestamp: "2026-11-22T17:00:00Z",
      actorRole: "super_admin",
      actorEmail: "admin@bamboohemp.in",
      action: "order.status_transition",
      resourceType: "Order",
      resourceId: "ord-1003",
      summary: "Updated order ORD-2026-1003 status from 'processing' to 'shipped'",
    },
    {
      id: "log-2",
      timestamp: "2026-11-22T15:20:00Z",
      actorRole: "catalogue_manager",
      actorEmail: "ops@bamboohemp.in",
      action: "inventory.stock_adjustment",
      resourceType: "Variant",
      resourceId: "var-2",
      summary: "Restocked BAM-TEE-GRN-M by +20 units (reason: purchase_receipt)",
    },
    {
      id: "log-3",
      timestamp: "2026-11-22T12:00:00Z",
      actorRole: "super_admin",
      actorEmail: "admin@bamboohemp.in",
      action: "product.price_update",
      resourceType: "Product",
      resourceId: "prod-3",
      summary: "Updated compareAtPricePaise for Everyday Bamboo Trunk (3-Pack)",
    },
  ],
};

// Local storage persistent helper for browser demo
function getStorage(key, defaultVal) {
  if (typeof window === "undefined") return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage(key, val) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {}
}

export const api = {
  getAdminData: () => {
    return getStorage("bh_admin_data", INITIAL_ADMIN_DATA);
  },

  updateOrderStatus: (orderId, newStatus) => {
    const data = getStorage("bh_admin_data", INITIAL_ADMIN_DATA);
    const order = data.orders.find((o) => o.id === orderId);
    if (!order) return null;
    const oldStatus = order.orderStatus;
    order.orderStatus = newStatus;

    // Log to audit log
    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorRole: "super_admin",
      actorEmail: "admin@bamboohemp.in",
      action: "order.status_transition",
      resourceType: "Order",
      resourceId: orderId,
      summary: `Updated order ${order.orderNumber} status from '${oldStatus}' to '${newStatus}'`,
    });

    setStorage("bh_admin_data", data);
    return order;
  },

  adjustStock: (variantId, delta, reason = "manual_correction") => {
    const data = getStorage("bh_admin_data", INITIAL_ADMIN_DATA);
    const variant = data.inventory.find((v) => v.id === variantId);
    if (!variant) return null;
    const before = variant.stockQuantity;
    variant.stockQuantity = Math.max(0, variant.stockQuantity + delta);

    // Update KPI if needed
    data.kpi.lowStockCount = data.inventory.filter((v) => v.stockQuantity <= v.threshold).length;

    // Log to audit log
    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorRole: "order_manager",
      actorEmail: "admin@bamboohemp.in",
      action: "inventory.stock_adjustment",
      resourceType: "Variant",
      resourceId: variantId,
      summary: `Stock on SKU ${variant.sku} adjusted by ${delta > 0 ? "+" + delta : delta} (${before} -> ${variant.stockQuantity}, reason: ${reason})`,
    });

    setStorage("bh_admin_data", data);
    return variant;
  },

  updateProductPrice: (productId, priceRupees) => {
    const data = getStorage("bh_admin_data", INITIAL_ADMIN_DATA);
    const product = data.products.find((p) => p.id === productId);
    if (!product) return null;
    product.pricePaise = Math.round(priceRupees * 100);

    data.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorRole: "catalogue_manager",
      actorEmail: "admin@bamboohemp.in",
      action: "product.price_update",
      resourceType: "Product",
      resourceId: productId,
      summary: `Updated price for ${product.name} to ₹${priceRupees}`,
    });

    setStorage("bh_admin_data", data);
    return product;
  },
};
