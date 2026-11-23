"use client";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Announcements">
      <p className={styles.text}>
        🌿 Free Shipping on Orders Over ₹999 &nbsp;|&nbsp; Bamboo &amp; Hemp Essentials &nbsp;|&nbsp; OEKO-TEX Certified
      </p>
    </div>
  );
}
