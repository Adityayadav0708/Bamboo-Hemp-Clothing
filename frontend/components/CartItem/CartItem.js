"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import QuantitySelector from "@/components/QuantitySelector";
import { formatPrice } from "@/utils/formatters";
import { getProductBySlug } from "@/data/products";
import styles from "./CartItem.module.css";

export default function CartItem({ item, onUpdateQuantity, onUpdateVariant, onRemove }) {
  const [imgError, setImgError] = useState(false);

  // Canonical product lookup from catalog
  const productData = item.slug ? getProductBySlug(item.slug) : null;

  // Always prioritize canonical catalog image so stale localStorage paths never break rendering
  const canonicalImg =
    productData?.images?.[0] ||
    (item.image && !item.image.includes("placeholder") ? item.image : null) ||
    "/images/products/heelium-men-tee-black.png";

  const [imageSrc, setImageSrc] = useState(canonicalImg);

  // Keep image source in sync if catalog or item updates
  useEffect(() => {
    setImageSrc(canonicalImg);
    setImgError(false);
  }, [canonicalImg]);

  const handleImageError = () => {
    // If the canonical image fails, fall back to our verified neutral product shot first
    if (imageSrc !== "/images/products/heelium-men-tee-black.png") {
      setImageSrc("/images/products/heelium-men-tee-black.png");
    } else {
      setImgError(true);
    }
  };

  return (
    <article className={styles.item}>
      {/* Product Image */}
      <Link href={`/product/${item.slug}`} className={styles.imageWrap}>
        {!imgError ? (
          <Image
            src={imageSrc}
            alt={item.name}
            fill
            className={styles.image}
            sizes="96px"
            onError={handleImageError}
            priority
          />
        ) : (
          <div className={styles.imgFallback} aria-hidden="true">
            🌿
          </div>
        )}
      </Link>

      {/* Item Info */}
      <div className={styles.info}>
        <div className={styles.details}>
          <Link href={`/product/${item.slug}`} className={styles.name}>
            {item.name}
          </Link>

          <div className={styles.metaRow}>
            {productData?.sizes?.length > 1 ? (
              <label className={styles.sizeSelectWrap}>
                <span className={styles.metaLabel}>Size:</span>
                <select
                  value={item.size}
                  onChange={(e) => onUpdateVariant && onUpdateVariant(item.cartKey, e.target.value, item.color)}
                  className={styles.sizeSelect}
                  aria-label={`Select size for ${item.name}`}
                >
                  {productData.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <span className={styles.metaBadge}>
                Size: <strong>{item.size}</strong>
              </span>
            )}
            <span className={styles.metaBadge}>
              Color: <strong>{item.color}</strong>
            </span>
          </div>

          <p className={styles.unitPrice}>
            {formatPrice(item.price)} each
          </p>
        </div>

        {/* Controls */}
        <div className={styles.actions}>
          <div className={styles.quantity}>
            <QuantitySelector
              value={item.quantity}
              onChange={(newQty) => onUpdateQuantity(item.cartKey, newQty)}
              min={1}
              max={item.maxQty || 10}
            />
          </div>

          <div className={styles.totalWrap}>
            <span className={styles.totalPrice}>
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => onRemove(item.cartKey)}
              aria-label={`Remove ${item.name} from cart`}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
