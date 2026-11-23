import Breadcrumb from "@/components/Breadcrumb";
import styles from "./PolicyLayout.module.css";

export default function PolicyLayout({ title, lastUpdated, children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: title }]} />

        <article className={styles.article}>
          <header className={styles.header}>
            <span className={styles.badge}>Official Policy Placeholder</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.date}>Last Updated: {lastUpdated || "November 2024"}</p>
          </header>

          <div className={styles.disclaimerNotice}>
            ⚠️ <strong>Legal Review Pending:</strong> This document contains sample placeholder policies for technical development. Company legal counsel will review and approve legally binding business policies prior to production deployment.
          </div>

          <div className={styles.body}>{children}</div>
        </article>
      </div>
    </div>
  );
}
