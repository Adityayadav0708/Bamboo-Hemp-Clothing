"use client";
import Link from "next/link";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import EmptyState from "@/components/EmptyState";
import Breadcrumb from "@/components/Breadcrumb";
import { useCart } from "@/hooks/useCart";
import styles from "./CartPageClient.module.css";

export default function CartPageClient() {
  const { items, itemCount, subtotal, updateQuantity, updateVariant, removeItem, clearCart } = useCart();

  const breadcrumbs = [
    { label: "Shop", href: "/shop" },
    { label: `Cart (${itemCount})` },
  ];

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.wrapper}>
          <Breadcrumb items={[{ label: "Cart" }]} />
          <EmptyState
            icon="🛍️"
            title="Your Shopping Bag is Empty"
            message="Looks like you haven't added any sustainable essentials to your bag yet. Explore our bamboo and hemp collections to get started."
            ctaLabel="Explore Collections"
            ctaHref="/shop"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbs} />

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Shopping Cart</h1>
            <p className={styles.sub}>
              Review your items before proceeding to secure checkout.
            </p>
          </div>
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearCart}
            aria-label="Empty entire cart"
          >
            Clear Cart
          </button>
        </div>

        <div className={styles.grid}>
          {/* Cart Items List */}
          <section className={styles.itemsCol} aria-label="Cart Items">
            <div className={styles.itemsHeader}>
              <span>Product</span>
              <span className={styles.headerRight}>Quantity &amp; Total</span>
            </div>

            <div className={styles.itemsList}>
              {items.map((item) => (
                <CartItem
                  key={item.cartKey}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onUpdateVariant={updateVariant}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </section>

          {/* Order Summary Sidebar */}
          <aside className={styles.summaryCol} aria-label="Order Summary">
            <CartSummary subtotal={subtotal} itemCount={itemCount} />
          </aside>
        </div>
      </div>
    </div>
  );
}
