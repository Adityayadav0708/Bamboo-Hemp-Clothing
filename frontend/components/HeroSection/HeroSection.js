"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Left Text Content */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Conscious Essentials</span>
            <h1 id="hero-heading" className={styles.heading}>
              Wear That<br />Cares
            </h1>
            <p className={styles.description}>
              Discover everyday essentials crafted from organic bamboo and heritage hemp — breathable, anti-odor, and built for the Indian climate.
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

          {/* Right Image */}
          <div className={styles.imageWrap}>
            <div className={styles.imgContainer}>
              <Image
                src="/images/home/hero_models.png"
                alt="Models wearing breathable bamboo and hemp everyday essentials"
                fill
                priority
                className={styles.img}
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
