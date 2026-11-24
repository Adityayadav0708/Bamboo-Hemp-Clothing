"use client";
import styles from "./TrustBar.module.css";

const TRUST_ITEMS = [
  {
    id: "shipping",
    title: "Free Delivery Across India",
    subtitle: "Complimentary on all orders over ₹999",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: "organic",
    title: "100% Pure & Natural",
    subtitle: "Organic bamboo & rain-fed hemp",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "cooling",
    title: "360° All-Day Airflow",
    subtitle: "Thermoregulating micro-gap fiber weave",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    id: "returns",
    title: "15-Day Easy Returns",
    subtitle: "Doorstep pickup & quick refunds",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
];

export default function TrustBar() {
  return (
    <section className={styles.trustBar} aria-label="Brand Guarantees">
      <div className={styles.container}>
        <div className={styles.grid}>
          {TRUST_ITEMS.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.iconCircle} aria-hidden="true">
                {item.icon}
              </div>
              <div className={styles.textWrap}>
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.subtitle}>{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
