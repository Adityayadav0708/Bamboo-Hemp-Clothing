import Image from "next/image";
import Link from "next/link";
import styles from "./materials.module.css";

export const metadata = {
  title: "Fabric Guide: Organic Bamboo & Heritage Hemp | Bamboo & Hemp India",
  description:
    "Discover why organic bamboo viscose and Himalayan hemp are the world's most comfortable, breathable, and sustainable fabrics for T-shirts and innerwear.",
};

export default function MaterialsPage() {
  return (
    <div className={styles.page}>
      {/* ── Hero Header ── */}
      <header className={styles.header}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>MATERIAL INNOVATION</span>
          <h1 className={styles.title}>Engineered by Nature. Built for Everyday Comfort.</h1>
          <p className={styles.lead}>
            We formulate everyday T-shirts and innerwear from two of the planet’s most regenerative, skin-friendly fibers: closed-loop organic bamboo and rain-fed Himalayan hemp.
          </p>
        </div>
      </header>

      {/* ── Comparison Overview ── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.gridTwo}>
            {/* Bamboo Card */}
            <article className={styles.materialCard}>
              <div className={styles.imgWrap}>
                <Image
                  src="/images/about/about-bamboo.jpg"
                  alt="Organic Bamboo Weave"
                  fill
                  className={styles.cardImg}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className={styles.cardBadge}>CLOUD SOFTNESS</span>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>Organic Bamboo Viscose</h2>
                <p className={styles.cardDesc}>
                  Bamboo fibers are naturally round and microscopic in smoothness, eliminating the micro-abrasions that typical cotton or synthetics cause against sensitive skin.
                </p>
                <ul className={styles.propList}>
                  <li>
                    <strong>Micro-Gap Breathability:</strong> Millions of microscopic air pockets regulate body temperature, keeping you 3° cooler than cotton in Indian summers.
                  </li>
                  <li>
                    <strong>Hypoallergenic:</strong> Gentle on dermatitis, eczema, and heat rash prone skin.
                  </li>
                  <li>
                    <strong>Bamboo Kun Antimicrobial:</strong> Naturally resists bacterial growth and eliminates post-sweat odor.
                  </li>
                  <li>
                    <strong>Closed-Loop Processing:</strong> 99% of non-toxic solvents are recovered and recycled in production.
                  </li>
                </ul>
                <Link href="/category/bamboo-tshirts" className={styles.cardCta}>
                  Shop Bamboo Essentials &rarr;
                </Link>
              </div>
            </article>

            {/* Hemp Card */}
            <article className={styles.materialCard}>
              <div className={styles.imgWrap}>
                <Image
                  src="/images/about/about-hemp.jpg"
                  alt="Himalayan Heritage Hemp Fibers"
                  fill
                  className={styles.cardImg}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className={styles.cardBadge}>TIMELESS DURABILITY</span>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>Himalayan Heritage Hemp</h2>
                <p className={styles.cardDesc}>
                  One of the oldest textiles known to mankind, industrial hemp bast fiber possesses 4x the tensile strength of cotton, holding its shape without sagging over years of daily wear.
                </p>
                <ul className={styles.propList}>
                  <li>
                    <strong>Gets Softer Every Wash:</strong> Unlike cotton that degrades and thins, hemp fibers break in gracefully, becoming softer with every wash cycle.
                  </li>
                  <li>
                    <strong>Zero Irrigation Needed:</strong> 100% rain-fed in the lower Himalayan foothills, replenishing topsoil nitrogen naturally.
                  </li>
                  <li>
                    <strong>Natural UV Protection:</strong> Filters up to 95% of harmful ultraviolet rays.
                  </li>
                  <li>
                    <strong>Thermoregulating Porosity:</strong> Traps insulating air in cooler weather while expelling excess moisture in muggy weather.
                  </li>
                </ul>
                <Link href="/category/hemp-tshirts" className={styles.cardCta}>
                  Shop Hemp Collection &rarr;
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Key Metrics Comparison ── */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>SUSTAINABILITY AUDIT</span>
            <h2 className={styles.subTitle}>Why Bamboo &amp; Hemp Outperform Fast Fashion Cotton</h2>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>-70%</span>
              <h3 className={styles.metricLabel}>Water Footprint</h3>
              <p className={styles.metricDesc}>Rain-fed cultivation saves over 2,000 liters of water per garment compared to commercial cotton.</p>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>0</span>
              <h3 className={styles.metricLabel}>Pesticides &amp; Toxins</h3>
              <p className={styles.metricDesc}>Bamboo and hemp grow naturally resilient, requiring zero chemical pesticides or defoliants.</p>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>3x</span>
              <h3 className={styles.metricLabel}>Moisture Absorption</h3>
              <p className={styles.metricDesc}>Wicks sweat away from the body 3x faster than cotton, preventing chafing and dampness.</p>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricNumber}>100%</span>
              <h3 className={styles.metricLabel}>Biodegradable</h3>
              <p className={styles.metricDesc}>Natural fibers decompose harmlessly back into the earth at the end of their lifecycle without microplastics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaHeading}>Experience Second-Skin Comfort</h2>
            <p className={styles.ctaSub}>
              Free carbon-neutral delivery across India on orders over ₹999 with 15-day doorstep returns.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/category/bamboo-tshirts" className={styles.primaryBtn}>
                Shop Bamboo T-Shirts
              </Link>
              <Link href="/category/mens-innerwear" className={styles.secondaryBtn}>
                Shop Everyday Innerwear
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
