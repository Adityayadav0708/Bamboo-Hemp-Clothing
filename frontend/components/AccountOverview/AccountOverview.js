"use client";
import Link from "next/link";
import AccountLayout from "@/components/AccountLayout";
import { formatPrice, formatDate } from "@/utils/formatters";
import styles from "./AccountOverview.module.css";

export default function AccountOverview({ orders = [] }) {
  const recentOrders = orders.slice(0, 2);

  return (
    <AccountLayout activeTab="Dashboard">
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div>
          <h1 className={styles.title}>Account Dashboard</h1>
          <p className={styles.subtitle}>
            Manage your personal profile, review order history, and track recent deliveries.
          </p>
        </div>
        <div className={styles.ecoBadge}>
          <span>🌱 Sustainable Shopper</span>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statIcon}>📦</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{orders.length}</span>
            <span className={styles.statLabel}>Total Orders</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>🌿</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>100%</span>
            <span className={styles.statLabel}>Organic Fabrics Chosen</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statIcon}>🚚</span>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>Free</span>
            <span className={styles.statLabel}>Delivery on Orders &gt; ₹999</span>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <Link href="/account/orders" className={styles.viewAllLink}>
            View all orders →
          </Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className={styles.orderList}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderRow}>
                <div className={styles.orderInfo}>
                  <strong className={styles.orderId}>#{order.id}</strong>
                  <span className={styles.orderDate}>{formatDate(order.date)}</span>
                  <span className={styles.orderItems}>
                    {order.items.map((i) => i.name).join(", ")}
                  </span>
                </div>

                <div className={styles.orderMeta}>
                  <span
                    className={`${styles.statusBadge} ${
                      order.status === "Delivered"
                        ? styles.statusDelivered
                        : styles.statusProcessing
                    }`}
                  >
                    {order.status}
                  </span>
                  <strong className={styles.orderTotal}>{formatPrice(order.total)}</strong>
                  <Link href={`/account/orders/${order.id}`} className={styles.detailsLink}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noOrders}>No orders placed yet.</p>
        )}
      </section>

      {/* Saved Addresses Section */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Default Shipping Address</h2>
          <span className={styles.verifiedTag}>✓ Verified</span>
        </div>

        <div className={styles.addressBox}>
          <strong>Demo Customer</strong>
          <p>
            42, MG Road, Koramangala<br />
            Bengaluru, Karnataka - 560034<br />
            Phone: +91 99999 99999
          </p>
        </div>
      </section>
    </AccountLayout>
  );
}
