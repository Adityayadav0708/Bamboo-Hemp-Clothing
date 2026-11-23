import Link from "next/link";
import styles from "./Breadcrumb.module.css";

/**
 * Breadcrumb — receives an array of { label, href? } items.
 * Last item is current page (no link).
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.nav} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <span className={styles.sep} aria-hidden="true">/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className={styles.link}>{item.label}</Link>
            ) : (
              <span className={styles.current} aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
