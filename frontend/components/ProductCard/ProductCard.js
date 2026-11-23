"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PriceDisplay from "@/components/PriceDisplay";
import { useCart } from "@/hooks/useCart";
import styles from "./ProductCard.module.css";

const BADGE_MAP = {
  Bestseller: "bestseller",
  "New Arrival": "new",
  Sale: "sale",
  "Eco-Friendly": "eco",
  "Value Pack": "eco",
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (!product) return null;

  const badge = product.badges?.[0];
  const hasSecondImage = product.images?.length > 1;
  const displayImg = hovered && hasSecondImage ? product.images[1] : product.images[0];

  function handleQuickAdd(e) {
    e.preventDefault();
    // Quick-add uses first size and first color as defaults
    const defaultSize = product.sizes?.[0];
    const defaultColor = product.colors?.[0]?.slug;
    if (!defaultSize || !defaultColor) return;

    addItem(product, 1, defaultSize, defaultColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article className={styles.card}>
      <Link
        href={`/product/${product.slug}`}
        className={styles.imageWrap}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View ${product.name}`}
      >
        {/* Badge */}
        {badge && (
          <span className={`${styles.badge} ${styles[`badge--${BADGE_MAP[badge] ?? "eco"}`]}`}>
            {badge}
          </span>
        )}

        {/* Product image */}
        <div className={styles.imgContainer}>
          <Image
            src={displayImg || "/images/products/heelium-men-tee-black.png"}
            alt={product.name}
            fill
            className={styles.img}
            sizes="(max-width: 480px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={(e) => { e.currentTarget.src = "/images/products/heelium-men-tee-black.png"; }}
          />
        </div>

        {/* Quick add overlay */}
        <button
          className={`${styles.quickAdd} ${added ? styles.added : ""}`}
          onClick={handleQuickAdd}
          aria-label={added ? "Added to cart" : `Quick add ${product.name} to cart`}
          tabIndex={0}
        >
          {added ? "✓ Added" : "+ Quick Add"}
        </button>
      </Link>

      {/* Info */}
      <div className={styles.info}>
        {/* Color swatches */}
        {product.colors?.length > 0 && (
          <div className={styles.swatches} aria-label="Available colors">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.slug}
                className={styles.swatch}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className={styles.swatchMore}>+{product.colors.length - 4}</span>
            )}
          </div>
        )}

        <Link href={`/product/${product.slug}`} className={styles.nameLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        <div className={styles.priceRow}>
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            currency={product.currency}
            size="sm"
          />
        </div>

        {/* Rating */}
        {product.rating && (
          <div className={styles.rating} aria-label={`${product.rating} out of 5 stars`}>
            <span className={styles.stars}>{renderStars(product.rating)}</span>
            <span className={styles.reviewCount}>({product.reviewCount})</span>
          </div>
        )}
      </div>
    </article>
  );
}

function renderStars(rating) {
  return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}
