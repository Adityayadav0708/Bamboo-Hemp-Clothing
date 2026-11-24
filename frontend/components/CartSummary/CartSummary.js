"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { formatPrice } from "@/utils/formatters";
import { useCart } from "@/hooks/useCart";
import styles from "./CartSummary.module.css";

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;
const SUPPORTED_COUPONS = {
  BAMBOO10: { discountPercent: 10, minSubtotal: 999 },
  WELCOME10: { discountPercent: 10, minSubtotal: 999 },
  HEMP20: { discountPercent: 20, minSubtotal: 1999 },
};

export default function CartSummary({ subtotal, itemCount }) {
  const { couponCode: savedCoupon, setCouponCode: setSavedCoupon } = useCart();
  const [couponInput, setCouponInput] = useState(savedCoupon || "");
  const [couponMsg, setCouponMsg] = useState(null);

  const activeCoupon = savedCoupon ? SUPPORTED_COUPONS[savedCoupon] : null;
  const discountPercent =
    activeCoupon && subtotal >= activeCoupon.minSubtotal ? activeCoupon.discountPercent : 0;

  const isFreeShipping = Math.max(0, subtotal - Math.round((subtotal * discountPercent) / 100)) >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  function handleApplyCoupon(e) {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const match = SUPPORTED_COUPONS[code];
    if (!match) {
      setCouponMsg({ type: "error", text: "Invalid coupon code. Try WELCOME10, BAMBOO10, or HEMP20." });
      return;
    }
    if (subtotal < match.minSubtotal) {
      setCouponMsg({
        type: "error",
        text: `Code ${code} requires a minimum order of ${formatPrice(match.minSubtotal)}.`,
      });
      return;
    }

    setSavedCoupon(code);
    setCouponMsg({ type: "success", text: `Code ${code} applied: ${match.discountPercent}% discount!` });
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
            <span>Discount ({discountPercent}% · {savedCoupon})</span>
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
            placeholder="Promo code (e.g. WELCOME10)"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
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
