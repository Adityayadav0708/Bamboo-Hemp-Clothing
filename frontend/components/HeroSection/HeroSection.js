"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      {/* Full-bleed background image on desktop; stacked top visual on mobile */}
      <div className={styles.mediaWrap}>
        <Image
          src="/images/home/hero_couple.jpg"
          alt="Couple smiling in breathable cream and sage green bamboo and hemp everyday T-shirts"
          fill
          priority
          unoptimized
          sizes="100vw"
          className={styles.img}
        />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      {/* Editorial Copy & CTAs */}
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>Conscious Essentials</span>
          <h1 id="hero-heading" className={styles.heading}>
            Wear That<br />Cares
          </h1>
          <p className={styles.description}>
            Discover everyday essentials crafted from  bamboo and heritage hemp — breathable, anti-odor, and built for the Indian climate.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/category/bamboo-tshirts" className={styles.primaryBtn}>
              Shop T-Shirts
            </Link>
            <Link href="/category/mens-innerwear" className={styles.secondaryBtn}>
              Shop Innerwear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
