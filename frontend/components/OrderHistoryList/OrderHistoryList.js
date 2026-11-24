"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AccountLayout from "@/components/AccountLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { getUserOrders } from "@/services/api/orderService";
import { formatPrice, formatDate } from "@/utils/formatters";
import { getProductBySlug } from "@/data/products";
import styles from "./OrderHistoryList.module.css";

export default function OrderHistoryList({ orders: initialOrders = null }) {
  const { user } = useAuth();
  const [ordersState, setOrdersState] = useState({
    loadedForId: null,
    list: initialOrders || [],
  });

  useEffect(() => {
    const uid = user?.id;
    if (!uid) return;
    let cancelled = false;
    getUserOrders()
      .then((list) => {
        if (!cancelled) {
          setOrdersState({ loadedForId: uid, list: Array.isArray(list) ? list : [] });
        }
      })
      .catch(() => {
        if (!cancelled) setOrdersState({ loadedForId: uid, list: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const orders = ordersState.list;
  const loading = !initialOrders && Boolean(user?.id) && ordersState.loadedForId !== user.id;

  return (
    <AccountLayout activeTab="My Orders">
      <div className={styles.header}>
        <h1 className={styles.title}>Order History</h1>
        <p className={styles.subtitle}>
          Track your past and current purchases of bamboo and hemp essentials.
        </p>
      </div>

      {loading ? (
        <div className={styles.emptyCard}>
          <LoadingSpinner size="md" label="Loading orders…" />
        </div>
      ) : orders.length === 0 ? (
        <div className={styles.emptyCard}>
          <span className={styles.emptyIcon}>📦</span>
          <h3>No Orders Found</h3>
          <p>You haven&apos;t placed any orders with us yet.</p>
          <Link href="/shop" className={styles.shopBtn}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.cardHead}>
                <div className={styles.headLeft}>
                  <div>
                    <span className={styles.headLabel}>Order Placed</span>
                    <strong className={styles.headValue}>{formatDate(order.date)}</strong>
                  </div>
                  <div>
                    <span className={styles.headLabel}>Total Amount</span>
                    <strong className={styles.headValue}>{formatPrice(order.total)}</strong>
                  </div>
                  <div>
                    <span className={styles.headLabel}>Order Number</span>
                    <span className={styles.orderNum}>#{order.id}</span>
                  </div>
                </div>

                <div className={styles.headRight}>
                  <span
                    className={`${styles.badge} ${
                      order.status?.toLowerCase() === "delivered"
                        ? styles.badgeDelivered
                        : styles.badgeProcessing
                    }`}
                  >
                    ● {order.status}
                  </span>
                  <Link href={`/account/orders/${order.id}`} className={styles.detailsBtn}>
                    Order Details →
                  </Link>
                </div>
              </div>

              <div className={styles.itemsPreview}>
                {order.items.map((item, idx) => {
                  const p = item.slug ? getProductBySlug(item.slug) : null;
                  const itemImg =
                    p?.images?.[0] ||
                    (item.image && !item.image.includes("placeholder") ? item.image : null) ||
                    "/images/products/heelium-men-tee-black.png";
                  return (
                    <div
                      key={`${order.id}-${item.productId || item.slug}-${item.size}-${idx}`}
                      className={styles.previewItem}
                    >
                      <div className={styles.thumbWrap}>
                        <Image
                          src={itemImg}
                          alt={item.name}
                          fill
                          className={styles.thumbImg}
                          sizes="60px"
                        />
                      </div>
                      <div className={styles.previewInfo}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemMeta}>
                          Size: {item.size} · Color: {item.color} · Qty: {item.quantity}
                        </p>
                        <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
}
