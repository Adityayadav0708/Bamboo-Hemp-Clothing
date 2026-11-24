"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./CoolingBundles.module.css";

const BUNDLES = [
  {
    id: "bundle-trunks-3",
    title: "Bamboo Underwear Trunk (Pack of 3)",
    tag: "MOST POPULAR",
    fabric: "95% Bamboo Viscose / 5% Elastane",
    price: "₹1,299",
    originalPrice: "₹2,199",
    savings: "SAVE ₹900",
    image: "/images/products/heelium-men-trunk-pack3.jpg",
    slug: "bamboo-underwear-trunk-men-pack3",
    perItem: "₹433 / piece",
    features: [
      "No-roll micro-mesh cooling waistband",
      "Ergonomic anti-chafing contour pouch",
      "Stay-down 3-inch inseam prevents ride-up",
      "Naturally anti-bacterial & odor-resistant",
    ],
  },
  {
    id: "bundle-tees-2",
    title: "Bamboo Round Neck T-Shirt (2-Pack)",
    tag: "BEST VALUE",
    fabric: "67% Bamboo / 28% Organic Cotton / 5% Spandex",
    price: "₹1,890",
    originalPrice: "₹3,998",
    savings: "SAVE ₹2,108",
    image: "/images/products/heelium-men-tee-black.png",
    slug: "bamboo-round-neck-tshirt-men",
    perItem: "₹945 / piece",
    features: [
      "Signature second-skin buttery drape",
      "Active thermoregulation keeps skin 3° cooler",
      "4-way stretch with shape-retention collar",
      "Dyed with low-impact certified botanical inks",
    ],
  },
  {
    id: "bundle-hemp-duo",
    title: "Heritage Himalayan Hemp Boxy Duo",
    tag: "LIMITED EDITION",
    fabric: "55% Heritage Hemp / 45% Organic Cotton",
    price: "₹2,699",
    originalPrice: "₹4,598",
    savings: "SAVE ₹1,899",
    image: "/images/home/bestseller_2.png",
    slug: "heritage-hemp-boxy-tee",
    perItem: "₹1,349 / piece",
    features: [
      "4x more durable than fast-fashion cotton",
      "Gets noticeably softer with every single wash",
      "UPF 50+ natural ultraviolet barrier",
      "Cultivated with zero pesticides in the Himalayas",
    ],
  },
];

export default function CoolingBundles() {
  return (
    <section className={styles.section} aria-labelledby="bundles-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>BAMBOO &amp; HEMP MULTI-PACKS</span>
          <h2 id="bundles-heading" className={styles.heading}>
            Stock Up &amp; Save up to 50%
          </h2>
          <p className={styles.description}>
            Experience all-day cooling and zero-friction innerwear and tees in convenient multi-pack bundles.
          </p>
        </div>

        <div className={styles.grid}>
          {BUNDLES.map((b) => (
            <div key={b.id} className={styles.card}>
              <div className={styles.imgWrap}>
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className={styles.img}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className={styles.badge}>{b.tag}</span>
                <span className={styles.savingsPill}>{b.savings}</span>
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.fabric}>{b.fabric}</p>

                <div className={styles.priceRow}>
                  <span className={styles.price}>{b.price}</span>
                  <span className={styles.originalPrice}>{b.originalPrice}</span>
                  <span className={styles.perItem}>{b.perItem}</span>
                </div>

                <ul className={styles.featureList}>
                  {b.features.map((f, i) => (
                    <li key={i}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2B5741" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={`/product/${b.slug}`} className={styles.btn}>
                  Shop Multi-Pack &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
