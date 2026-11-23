import Image from "next/image";
import { formatPrice } from "@/utils/formatters";
import { getProductBySlug } from "@/data/products";
import styles from "./CheckoutSummary.module.css";

export default function CheckoutSummary({
  items,
  subtotal,
  deliveryFee,
  codFee = 0,
}) {
  const finalTotal = subtotal + deliveryFee + codFee;

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Order Summary ({items.length})</h3>

      {/* Item thumbnails */}
      <div className={styles.itemsList}>
        {items.map((item) => {
          const productData = item.slug ? getProductBySlug(item.slug) : null;
          const displayImage =
            productData?.images?.[0] ||
            (item.image && !item.image.includes("placeholder") ? item.image : null) ||
            "/images/products/heelium-men-tee-black.png";
          return (
            <div key={item.cartKey} className={styles.itemRow}>
              <div className={styles.imageWrap}>
                <Image
                  src={displayImage}
                  alt={item.name}
                  fill
                  className={styles.image}
                  sizes="56px"
                />
                <span className={styles.qtyBadge}>{item.quantity}</span>
              </div>

              <div className={styles.itemInfo}>
                <h4 className={styles.itemName}>{item.name}</h4>
                <p className={styles.itemMeta}>
                  {item.size} · {item.color}
                </p>
              </div>

              <span className={styles.itemPrice}>
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>

      <hr className={styles.divider} />

      {/* Cost calculation */}
      <div className={styles.calcRows}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className={styles.row}>
          <span>Shipping</span>
          <span>{deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
        </div>

        {codFee > 0 && (
          <div className={styles.row}>
            <span>Cash on Delivery Fee</span>
            <span>{formatPrice(codFee)}</span>
          </div>
        )}

        <div className={styles.row}>
          <span>Taxes (GST)</span>
          <span className={styles.taxNotice}>Included</span>
        </div>

        <hr className={styles.divider} />

        <div className={`${styles.row} ${styles.totalRow}`}>
          <strong>Total Payable</strong>
          <strong className={styles.totalAmount}>{formatPrice(finalTotal)}</strong>
        </div>
      </div>

      <div className={styles.securityBadge}>
        <span>🛡️ 100% Secure Payment Guarantee</span>
        <span>🌿 Carbon-Neutral Delivery</span>
      </div>
    </div>
  );
}
