"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./BestsellerSection.module.css";

const BESTSELLERS = [
  {
    id: "hl-tee-01",
    name: "Bamboo Round Neck T-shirt for Men",
    price: "₹990",
    originalPrice: "₹1,999",
    material: "67% Bamboo / 28% Cotton / 5% Spandex",
    image: "/images/products/heelium-men-tee-black.png",
    slug: "bamboo-round-neck-tshirt-men",
    colors: ["#1A1A1A", "#4A4D4A", "#1E2B4D", "#FAF9F5"],
  },
  {
    id: "hmp-01",
    name: "Heritage Himalayan Hemp Boxy Tee",
    price: "₹1,499",
    originalPrice: "₹2,299",
    material: "55% Hemp / 45% Organic Cotton",
    image: "/images/home/bestseller_2.png",
    slug: "heritage-hemp-boxy-tee",
    colors: ["#D9D1C2", "#2E4D3E", "#333533"],
  },
  {
    id: "hl-trk-03",
    name: "Bamboo Underwear Trunk for Men (Pack of 3)",
    price: "₹1,299",
    originalPrice: "₹2,199",
    material: "95% Bamboo / 5% Elastane",
    image: "/images/products/heelium-men-trunk-pack3.jpg",
    slug: "bamboo-underwear-trunk-men-pack3",
    colors: ["#1A1A1A", "#FFFFFF", "#5C1D24"],
  },
  {
    id: "hl-wbk-02",
    name: "Bamboo Bikini Underwear for Women (Pack of 2)",
    price: "₹799",
    originalPrice: "₹1,399",
    material: "95% Bamboo / 5% Elastane",
    image: "/images/products/heelium-women-bikini-pack2.webp",
    slug: "bamboo-bikini-underwear-women-pack2",
    colors: ["#E5D2C1", "#1A1A1A"],
  },
];

export default function BestsellerSection() {
  return (
    <section className={styles.section} aria-labelledby="bestsellers-heading">
      <div className={styles.container}>
        {/* Eyebrow */}
        <span className={styles.eyebrow}>03 / Most Loved Essentials</span>

        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="bestsellers-heading" className={styles.heading}>
            Bestselling Products
          </h2>
          <p className={styles.description}>
            Tried, tested, and worn daily across India. Made from certified bamboo viscose and heritage Himalayan hemp.
          </p>
        </div>

        {/* 4 Column Product Grid */}
        <div className={styles.grid}>
          {BESTSELLERS.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.slug}`}
              className={styles.card}
              aria-label={`View ${item.name} for ${item.price}`}
            >
              <div className={styles.imgWrap}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={styles.img}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className={styles.info}>
                <div className={styles.titlePriceRow}>
                  <h3 className={styles.name}>{item.name}</h3>
                  <span className={styles.price}>{item.price}</span>
                </div>

                <p className={styles.material}>{item.material}</p>

                <div className={styles.colorDots} aria-label="Available color swatches">
                  {item.colors.map((hex, idx) => (
                    <span
                      key={idx}
                      className={styles.dot}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
