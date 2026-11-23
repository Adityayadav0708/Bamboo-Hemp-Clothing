"use client";
import Link from "next/link";
import Image from "next/image";
import AccountLayout from "@/components/AccountLayout";
import { formatPrice, formatDate } from "@/utils/formatters";
import { getProductBySlug } from "@/data/products";
import styles from "./OrderDetailView.module.css";

const TIMELINE_STEPS = [
  { label: "Order Placed", date: "Nov 01, 2024", completed: true },
  { label: "Processing", date: "Nov 02, 2024", completed: true },
  { label: "Shipped", date: "Nov 03, 2024", completed: true },
  { label: "Delivered", date: "Nov 05, 2024", completed: true },
];

export default function OrderDetailView({ order }) {
  if (!order) return null;

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
              order.status === "Delivered" ? styles.badgeDelivered : styles.badgeProcessing
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
          ⚠️ <strong>Placeholder tracking status:</strong> Live carrier webhook tracking (Delhivery / BlueDart) will be wired when logistics provider is finalized.
        </p>

        <div className={styles.timeline}>
          {TIMELINE_STEPS.map((step, idx) => (
            <div
              key={step.label}
              className={`${styles.step} ${step.completed ? styles.stepCompleted : ""}`}
            >
              <div className={styles.stepMarker}>✓</div>
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
          {order.items.map((item) => {
            const p = item.slug ? getProductBySlug(item.slug) : null;
            const itemImg =
              p?.images?.[0] ||
              (item.image && !item.image.includes("placeholder") ? item.image : null) ||
              "/images/products/heelium-men-tee-black.png";
            return (
              <div key={item.productId} className={styles.itemRow}>
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
        {/* Shipping address */}
        <div className={styles.infoBox}>
          <h3 className={styles.boxTitle}>Shipping Destination</h3>
          <div className={styles.boxBody}>
            <strong>{order.shippingAddress.name}</strong>
            <p>
              {order.shippingAddress.addressLine1}<br />
              {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
              India
            </p>
            <p className={styles.phone}>Phone: {order.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className={styles.infoBox}>
          <h3 className={styles.boxTitle}>Payment &amp; Invoice</h3>
          <div className={styles.costRows}>
            <div className={styles.costRow}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal || order.total)}</span>
            </div>
            <div className={styles.costRow}>
              <span>Shipping Fee</span>
              <span>{order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}</span>
            </div>
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
              <strong>Total Paid</strong>
              <strong className={styles.finalTotal}>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
}
