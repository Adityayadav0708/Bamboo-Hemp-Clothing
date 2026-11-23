"use client";
import styles from "./SortDropdown.module.css";

const OPTIONS = [
  { value: "default",    label: "Featured" },
  { value: "newest",     label: "New Arrivals" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Best Rated" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className={styles.wrap}>
      <label htmlFor="sort-select" className={styles.label}>Sort by:</label>
      <select
        id="sort-select"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
