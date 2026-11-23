import { formatPrice } from "@/utils/formatters";
import styles from "./PriceDisplay.module.css";

export default function PriceDisplay({ price, originalPrice, currency = "INR", size = "md" }) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={`${styles.wrap} ${styles[size]}`}>
      <span className={styles.price}>{formatPrice(price, currency)}</span>
      {hasDiscount && (
        <>
          <span className={styles.original}>{formatPrice(originalPrice, currency)}</span>
          <span className={styles.discount}>-{discountPct}%</span>
        </>
      )}
    </div>
  );
}
