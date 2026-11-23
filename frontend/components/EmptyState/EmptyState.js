import Button from "@/components/Button";
import styles from "./EmptyState.module.css";

export default function EmptyState({ icon = "🌿", title, message, ctaLabel, ctaHref }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">{icon}</span>
      {title && <h2 className={styles.title}>{title}</h2>}
      {message && <p className={styles.message}>{message}</p>}
      {ctaLabel && ctaHref && (
        <Button href={ctaHref} variant="primary" size="md">{ctaLabel}</Button>
      )}
    </div>
  );
}
