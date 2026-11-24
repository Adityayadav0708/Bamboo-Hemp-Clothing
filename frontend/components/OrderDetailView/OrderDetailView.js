"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AccountLayout from "@/components/AccountLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getOrderById } from "@/services/api/orderService";
import { formatPrice, formatDate } from "@/utils/formatters";
import { getProductBySlug } from "@/data/products";
import styles from "./OrderDetailView.module.css";

const STATUS_SEQUENCE = ["placed", "confirmed", "processing", "shipped", "delivered"];

function buildTimeline(status = "Placed", date) {
  const normalized = status.toLowerCase();
  if (normalized === "cancelled") {
    return [
      { label: "Order Placed", date: formatDate(date), completed: true },
      { label: "Cancelled", date: "Updated", completed: true },
    ];
  }
  const rankMap = {
    placed: 0,
    pending_payment: 0,
    confirmed: 0,
    processing: 1,
    packed: 1,
    shipped: 2,
    delivered: 3,
  };
  const currentStep = rankMap[normalized] ?? 0;
  return [
    { label: "Order Placed", date: currentStep >= 0 ? formatDate(date) : "Pending", completed: currentStep >= 0 },
    { label: "Processing", date: currentStep >= 1 ? "In progress / Done" : "Pending", completed: currentStep >= 1 },
    { label: "Shipped", date: currentStep >= 2 ? "Dispatched" : "Pending", completed: currentStep >= 2 },
    { label: "Delivered", date: currentStep >= 3 ? "Completed" : "Pending", completed: currentStep >= 3 },
  ];
}

export default function OrderDetailView({ order: initialOrder = null, orderId = null }) {
  const [order, setOrder] = useState(initialOrder);
  const [loading, setLoading] = useState(!initialOrder && !!orderId);
  const [error, setError] = useState("");

  useEffect(() => {
    const targetId = orderId || initialOrder?.id;
    if (!targetId) return;
    let cancelled = false;
    getOrderById(targetId)
      .then((fetched) => {
        if (!cancelled && fetched) setOrder(fetched);
      })
      .catch((err) => {
        if (!cancelled && !initialOrder) {
          setError(err.message || "Order not found.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId, initialOrder]);

  if (loading) {
    return (
      <AccountLayout activeTab="Order Details">
        <div className={styles.itemsCard} style={{ alignItems: "center", padding: "3rem" }}>
          <LoadingSpinner size="md" label="Loading order details…" />
        </div>
      </AccountLayout>
    );
  }

  if (!order) {
    return (
      <AccountLayout activeTab="Order Details">
        <div className={styles.itemsCard}>
          <Link href="/account/orders" className={styles.backLink}>
            ← Back to All Orders
          </Link>
          <h1 className={styles.title}>Order Not Found</h1>
          <p className={styles.meta}>{error || "We could not find details for this order."}</p>
        </div>
      </AccountLayout>
    );
  }

  const timelineSteps = buildTimeline(order.status, order.date);

  return (
    <AccountLayout activeTab={`Order #${order.id}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/account/orders" className={styles.backLink}>
            ← Back to All Orders
          </Link>
          <h1 className={styles.title}>Order Details</h1>
          <p className={styles.meta}>
            Order <strong>#{order.id}</strong> · Placed on {formatDate(order.date)}
          </p>
        </div>

        <div className={styles.headerRight}>
          <span
            className={`${styles.badge} ${
              order.status?.toLowerCase() === "delivered"
                ? styles.badgeDelivered
                : styles.badgeProcessing
            }`}
          >
            ● {order.status}
          </span>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className={styles.timelineCard}>
        <h3 className={styles.timelineTitle}>Delivery Progress</h3>
        <p className={styles.trackingNotice}>
          {order.trackingNumber ? (
            <>Tracking Ref: <strong>{order.trackingNumber}</strong> (Live courier webhook updates pending logistics integration)</>
          ) : (
            <>⚠️ <strong>Placeholder tracking status:</strong> Live carrier webhook tracking will activate after dispatch.</>
          )}
        </p>

        <div className={styles.timeline}>
          {timelineSteps.map((step) => (
            <div
              key={step.label}
              className={`${styles.step} ${step.completed ? styles.stepCompleted : ""}`}
            >
              <div className={styles.stepMarker}>{step.completed ? "✓" : "•"}</div>
              <strong className={styles.stepLabel}>{step.label}</strong>
              <span className={styles.stepDate}>{step.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className={styles.itemsCard}>
        <h3 className={styles.cardTitle}>Items Purchased ({order.items.length})</h3>

        <div className={styles.itemsList}>
          {order.items.map((item, idx) => {
            const p = item.slug ? getProductBySlug(item.slug) : null;
            const itemImg =
              p?.images?.[0] ||
              (item.image && !item.image.includes("placeholder") ? item.image : null) ||
              "/images/products/heelium-men-tee-black.png";
            return (
              <div key={`${item.productId || item.slug}-${item.size}-${idx}`} className={styles.itemRow}>
                <div className={styles.imageWrap}>
                  <Image
                    src={itemImg}
                    alt={item.name}
                    fill
                    className={styles.image}
                    sizes="80px"
                  />
                </div>

                <div className={styles.itemDetails}>
                  <Link href={`/product/${item.slug}`} className={styles.itemName}>
                    {item.name}
                  </Link>
                  <span className={styles.itemMeta}>
                    Size: <strong>{item.size}</strong> · Color: <strong>{item.color}</strong> · Qty: <strong>{item.quantity}</strong>
                  </span>
                  <span className={styles.itemPrice}>{formatPrice(item.price)} each</span>
                </div>

                <div className={styles.itemTotal}>
                  <strong>{formatPrice(item.price * item.quantity)}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Column Info: Shipping & Payment */}
      <div className={styles.dualGrid}>
        <div className={styles.infoBox}>
          <h3 className={styles.boxTitle}>Shipping Destination</h3>
          {order.shippingAddress ? (
            <div className={styles.boxBody}>
              <strong>{order.shippingAddress.name}</strong>
              <p>
                {order.shippingAddress.addressLine1}<br />
                {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                {order.shippingAddress.country || "India"}
              </p>
              {order.shippingAddress.phone && (
                <p className={styles.phone}>Phone: {order.shippingAddress.phone}</p>
              )}
            </div>
          ) : (
            <p className={styles.boxBody}>Address unavailable</p>
          )}
        </div>

        <div className={styles.infoBox}>
          <h3 className={styles.boxTitle}>Payment &amp; Invoice</h3>
          <div className={styles.costRows}>
            <div className={styles.costRow}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal || order.total)}</span>
            </div>
            {order.discount > 0 && (
              <div className={styles.costRow}>
                <span>Discount</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className={styles.costRow}>
              <span>Shipping Fee</span>
              <span>{order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}</span>
            </div>
            {order.codFee > 0 && (
              <div className={styles.costRow}>
                <span>Cash on Delivery Fee</span>
                <span>{formatPrice(order.codFee)}</span>
              </div>
            )}
            <div className={styles.costRow}>
              <span>Payment Method</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className={styles.costRow}>
              <span>Payment Status</span>
              <span className={styles.paidStatus}>● {order.paymentStatus}</span>
            </div>
            <hr className={styles.divider} />
            <div className={`${styles.costRow} ${styles.totalCostRow}`}>
              <strong>Total</strong>
              <strong className={styles.finalTotal}>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
