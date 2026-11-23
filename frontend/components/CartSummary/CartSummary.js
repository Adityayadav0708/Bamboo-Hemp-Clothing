"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { formatPrice } from "@/utils/formatters";
import styles from "./CartSummary.module.css";

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export default function CartSummary({ subtotal, itemCount }) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  function handleApplyCoupon(e) {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "BAMBOO10") {
      setDiscountPercent(10);
      setCouponMsg({ type: "success", text: "Code BAMBOO10 applied: 10% discount!" });
    } else {
      setCouponMsg({ type: "error", text: "Invalid coupon code. Try BAMBOO10" });
    }
  }

  return (
    <div className={styles.summaryBox}>
      <h2 className={styles.heading}>Order Summary</h2>

      {/* Free shipping progress */}
      {subtotal > 0 && (
        <div className={styles.shippingNotice}>
          {isFreeShipping ? (
            <p className={styles.freeShipSuccess}>
              🎉 You unlocked <strong>Free Standard Delivery</strong>!
            </p>
          ) : (
            <p className={styles.freeShipEncourage}>
              Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for <strong>Free Delivery</strong>
            </p>
          )}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Breakdown */}
      <div className={styles.breakdown}>
        <div className={styles.row}>
          <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className={`${styles.row} ${styles.discountRow}`}>
            <span>Discount (10%)</span>
            <span>-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className={styles.row}>
          <span>Estimated Shipping</span>
          <span>{isFreeShipping ? "FREE" : formatPrice(shippingFee)}</span>
        </div>

        <div className={styles.row}>
          <span>Estimated GST / Taxes</span>
          <span className={styles.taxNotice}>Included in price</span>
        </div>

        <hr className={styles.divider} />

        <div className={`${styles.row} ${styles.totalRow}`}>
          <strong>Total</strong>
          <strong className={styles.finalTotal}>{formatPrice(total)}</strong>
        </div>
      </div>

      {/* Coupon Form */}
      <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
        <div className={styles.couponInputWrap}>
          <input
            type="text"
            className={styles.couponInput}
            placeholder="Promo code (e.g. BAMBOO10)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button type="submit" className={styles.couponBtn}>
            Apply
          </button>
        </div>
        {couponMsg && (
          <p className={couponMsg.type === "success" ? styles.msgSuccess : styles.msgError}>
            {couponMsg.text}
          </p>
        )}
      </form>

      {/* Checkout CTA */}
      <div className={styles.actions}>
        <Button href="/checkout" variant="primary" size="lg" fullWidth>
          Proceed to Checkout
        </Button>
        <Link href="/shop" className={styles.continueLink}>
          ← Continue Shopping
        </Link>
      </div>

      {/* Trust badges */}
      <div className={styles.trustFooter}>
        <span>🔒 Secure 256-bit SSL Checkout</span>
        <span>🌿 100% Biodegradable Packaging</span>
      </div>
    </div>
  );
}
