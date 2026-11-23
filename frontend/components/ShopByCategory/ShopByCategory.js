"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./ShopByCategory.module.css";

const CATEGORIES = [
  {
    id: "bamboo-tshirts",
    name: "Bamboo T-Shirts",
    slug: "bamboo-tshirts",
    image: "/images/products/heelium-men-tee-black.png",
  },
  {
    id: "hemp-tshirts",
    name: "Hemp T-Shirts",
    slug: "hemp-tshirts",
    image: "/images/bestseller_2.png",
  },
  {
    id: "mens-innerwear",
    name: "Men's Innerwear",
    slug: "mens-innerwear",
    image: "/images/products/heelium-men-trunk-pack3.jpg",
  },
  {
    id: "womens-innerwear",
    name: "Women's Innerwear",
    slug: "womens-innerwear",
    image: "/images/products/heelium-women-bikini-pack2.webp",
  },
];

export default function ShopByCategory() {
  return (
    <section className={styles.section} aria-labelledby="featured-categories-heading">
      <div className={styles.container}>
        <span className={styles.eyebrow}>02 / Curated Silhouettes</span>

        <div className={styles.header}>
          <h2 id="featured-categories-heading" className={styles.heading}>
            Featured Categories
          </h2>
          <Link href="/shop" className={styles.viewAll}>
            View All Essentials &rarr;
          </Link>
        </div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={styles.card}
              aria-label={`Explore ${cat.name}`}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className={styles.img}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardLabel}>
                <h3 className={styles.cardName}>{cat.name}</h3>
                <span className={styles.cardShop}>Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
