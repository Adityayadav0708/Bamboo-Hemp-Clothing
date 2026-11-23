import Image from "next/image";
import Link from "next/link";
import styles from "./BrandStory.module.css";

export default function BrandStory() {
  return (
    <section className={styles.section} aria-labelledby="story-heading">
      <div className={styles.inner}>
        {/* Image */}
        <div className={styles.imageWrap}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/hd/brand_story_hd.jpg"
              alt="Crafting sustainable bamboo and hemp everyday essentials in India"
              fill
              className={styles.img}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className={styles.statCard} aria-hidden="true">
            <strong>100% Organic</strong>
            <span>OEKO-TEX Certified Fibers</span>
          </div>
        </div>

        {/* Text */}
        <div className={styles.content}>
          <span className={styles.eyebrow}>Our Philosophy</span>
          <h2 id="story-heading" className={styles.heading}>
            Sustainable Comfort Isn&apos;t a Luxury. It&apos;s an Essential.
          </h2>
          <div className={styles.body}>
            <p>
              Your daily t-shirt and innerwear are the two garments in direct contact with your skin from morning to night. Yet most fast fashion builds them from cheap polyester and chemically treated cotton that trap moisture and irritate skin.
            </p>
            <p>
              We focus exclusively on two essentials: <strong>T-Shirts</strong> and <strong>Innerwear</strong>. Made from closed-loop bamboo viscose and rain-fed Himalayan hemp, our fabrics are engineered for the heat and humidity of India—buttery soft, antimicrobial, and getting even softer with every wash.
            </p>
          </div>
          <div className={styles.ctaRow}>
            <Link href="/about" className={styles.storyBtn}>
              Read Our Full Story &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
