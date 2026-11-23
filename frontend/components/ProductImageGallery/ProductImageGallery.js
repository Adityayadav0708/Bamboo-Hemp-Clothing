"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./ProductImageGallery.module.css";

export default function ProductImageGallery({ images = [], productName }) {
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState(false);

  if (!images.length) return null;

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.mainWrap}>
        <div className={styles.mainImg}>
          {!imgError ? (
            <Image
              src={images[active] || "/images/products/heelium-men-tee-black.png"}
              alt={`${productName} — image ${active + 1}`}
              fill
              priority={active === 0}
              className={styles.img}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.imgFallback} aria-hidden="true">
              🌿
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbs} role="list" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={i}
              role="listitem"
              className={`${styles.thumb} ${active === i ? styles.thumbActive : ""}`}
              onClick={() => {
                setActive(i);
                setImgError(false);
              }}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
            >
              <Image
                src={src || "/images/products/heelium-men-tee-black.png"}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className={styles.thumbImg}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
