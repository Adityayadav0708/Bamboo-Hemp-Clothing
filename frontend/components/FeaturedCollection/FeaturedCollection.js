import Image from "next/image";
import Button from "@/components/Button";
import { MOCK_PRODUCTS } from "@/data/products";
import styles from "./FeaturedCollection.module.css";

export default function FeaturedCollection() {
  // Show hemp t-shirts and daily innerwear
  const featured = MOCK_PRODUCTS.filter((p) => p.category === "hemp-tshirts" || p.category === "bamboo-tshirts").slice(0, 3);

  return (
    <section
      className={styles.section}
      aria-labelledby="featured-heading"
      style={{ background: "var(--color-primary)" }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Curated Collection</span>
          <h2 id="featured-heading" className={styles.heading}>
            The Everyday Tee Edit
          </h2>
          <p className={styles.sub}>
            Earthy, durable, and naturally breathable. Our hemp and bamboo t-shirts are tailored for those who choose lasting substance over fast fashion.
          </p>
          <Button href="/category/hemp-tshirts" variant="secondary" size="lg">
            Explore Hemp T-Shirts
          </Button>
        </div>

        <div className={styles.imageGrid}>
          {featured.map((p, i) => (
            <div key={p.id} className={`${styles.imgCard} ${i === 0 ? styles.imgCardLarge : ""}`}>
              <div className={styles.imgWrap}>
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.imgLabel}>{p.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
