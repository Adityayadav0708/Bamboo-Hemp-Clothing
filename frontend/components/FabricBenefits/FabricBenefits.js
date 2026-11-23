"use client";
import styles from "./FabricBenefits.module.css";

const FEATURES = [
  {
    id: "breathability",
    title: "Breathability",
    desc: "Micro-gaps in bamboo fiber allow continuous airflow, keeping skin dry through shifting temperatures.",
    tag: "01 / AIRFLOW",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
      </svg>
    ),
  },
  {
    id: "everyday-comfort",
    title: "Everyday Comfort",
    desc: "Round, smooth fiber cross-sections eliminate friction for a weightless, second-skin drape.",
    tag: "02 / SOFTNESS",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "fabric-composition",
    title: "Fabric Composition",
    desc: "OEKO-TEX certified organic bamboo viscose blended with durable, low-impact heritage hemp.",
    tag: "03 / CERTIFIED",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "odor-resistance",
    title: "Odor-Resistance",
    desc: "Naturally antimicrobial properties inhibit odor-causing bacteria, meaning fewer washes per wear.",
    tag: "04 / FRESHNESS",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-2h2zm0-4h-2V7h2z" />
      </svg>
    ),
  },
  {
    id: "thermoregulating",
    title: "Thermoregulating",
    desc: "Adapts naturally to your body heat—cool to the touch in summer, insulating in winter.",
    tag: "05 / BALANCE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#234938" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
];

export default function FabricBenefits() {
  return (
    <section id="engineered-by-nature" className={styles.section} aria-labelledby="nature-heading">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 id="nature-heading" className={styles.heading}>
            Engineered by Nature
          </h2>
          <p className={styles.description}>
            Our closed-loop bamboo and rain-fed hemp textiles deliver measurable performance without synthetic coatings.
          </p>
        </div>

        {/* 5 Column Grid */}
        <div className={styles.grid}>
          {FEATURES.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconBox} aria-hidden="true">
                {item.icon}
              </div>

              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>

              <span className={styles.bottomTag}>{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
