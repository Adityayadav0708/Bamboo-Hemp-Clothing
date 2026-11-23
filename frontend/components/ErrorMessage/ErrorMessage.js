import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className={styles.wrap} role="alert">
      <span className={styles.icon} aria-hidden="true">⚠️</span>
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>Try again</button>
      )}
    </div>
  );
}
