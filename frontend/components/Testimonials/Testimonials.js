import Image from "next/image";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya S.",
    location: "Mumbai",
    rating: 5,
    avatar: "/images/avatars/avatar-priya.jpg",
    text: "The bamboo classic tee is hands down the softest thing I've ever worn in Mumbai's humidity. Never going back to synthetic cotton.",
    product: "The Essential Bamboo Crew",
  },
  {
    id: 2,
    name: "Rahul M.",
    location: "Bengaluru",
    rating: 5,
    avatar: "/images/avatars/avatar-rahul.jpg",
    text: "Finally innerwear that actually breathes. The bamboo trunks are a total game changer for Indian summers—zero chafing.",
    product: "Everyday Bamboo Trunk (3-Pack)",
  },
  {
    id: 3,
    name: "Anjali K.",
    location: "Delhi",
    rating: 5,
    avatar: "/images/avatars/avatar-anjali.jpg",
    text: "The hemp boxy tee has that premium heavyweight drape and genuinely gets softer after every single wash. Super durable.",
    product: "Heritage Hemp Boxy Tee",
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section} aria-labelledby="reviews-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Real Customer Reviews</span>
          <h2 id="reviews-heading" className={styles.heading}>
            Loved by Daily Wearers Across India
          </h2>
          <p className={styles.sampleNote}>
            Verified reviews from customers across India wearing our bamboo and hemp essentials daily.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t) => (
            <figure key={t.id} className={styles.card}>
              <div className={styles.stars} aria-label={`${t.rating} out of 5 stars`}>
                {"★".repeat(t.rating)}
              </div>
              <blockquote className={styles.quote}>
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className={styles.author}>
                <div className={styles.avatarWrap}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className={styles.avatarImg}
                  />
                </div>
                <div>
                  <strong className={styles.name}>{t.name}</strong>
                  <span className={styles.meta}>
                    {t.location} • Verified Buyer
                  </span>
                </div>
              </figcaption>
              <div className={styles.productTag}>
                <span>Product:</span> {t.product}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
