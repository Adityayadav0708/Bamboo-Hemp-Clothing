import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ size = "md", label = "Loading…" }) {
  return (
    <div className={`${styles.wrap} ${styles[size]}`} role="status" aria-label={label}>
      <div className={styles.ring} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
