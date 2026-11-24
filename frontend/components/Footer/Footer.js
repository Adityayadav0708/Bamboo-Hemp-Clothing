import Link from "next/link";
import styles from "./Footer.module.css";

const FOOTER_LINKS = {
  Shop: [
    { label: "Bamboo T-Shirts", href: "/category/bamboo-tshirts" },
    { label: "Hemp T-Shirts", href: "/category/hemp-tshirts" },
    { label: "Men's Innerwear", href: "/category/mens-innerwear" },
    { label: "Women's Innerwear", href: "/category/womens-innerwear" },
    { label: "All Essentials", href: "/shop" },
  ],
  Philosophy: [
    { label: "Our Story", href: "/about" },
    { label: "Fabric Guide", href: "/materials" },
    { label: "Why Bamboo & Hemp?", href: "/materials" },
    { label: "Contact Us", href: "/contact" },
    { label: "Help & FAQ", href: "/faq" },
  ],
  Policies: [
    { label: "Shipping Policy (Free ₹999+)", href: "/shipping-policy" },
    { label: "15-Day Easy Returns", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "📸" },
  { label: "Facebook", href: "#", icon: "📘" },
  { label: "LinkedIn", href: "#", icon: "💼" },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* ── Top Trust Bar Inside Footer ── */}
      <div className={styles.certStrip}>
        <div className={styles.certContainer}>
          <div className={styles.certItem}>
            <span>🌿</span>
            <span>100% Natural &amp; Skin-Friendly</span>
          </div>
          <div className={styles.certItem}>
            <span>❄️</span>
            <span>Micro-Gap Thermal Airflow</span>
          </div>
          <div className={styles.certItem}>
            <span>🚚</span>
            <span>Free Shipping Across India &gt; ₹999</span>
          </div>
          <div className={styles.certItem}>
            <span>🔄</span>
            <span>15-Day Doorstep Returns</span>
          </div>
        </div>
      </div>

      {/* ── Main Links ── */}
      <div className={styles.main}>
        <div className={styles.container}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoBadge}>BH</span>
              <span className={styles.logoText}>BAMBOO &amp; HEMP</span>
            </Link>
            <p className={styles.tagline}>
              Conscious everyday essentials crafted from closed-loop bamboo and rain-fed Himalayan hemp. Built for lasting comfort in Indian weather.
            </p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className={styles.col}>
              <h3 className={styles.colHeading}>{heading}</h3>
              <ul className={styles.colList}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.colLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            &copy; {currentYear} BAMBOO &amp; HEMP India. All rights reserved. Prices in INR (₹).
          </p>
          <p className={styles.made}>
            Designed for conscious living · T-Shirts &amp; Everyday Innerwear
          </p>
        </div>
      </div>
    </footer>
  );
}
