"use client";
import styles from "./SizeSelector.module.css";

const STANDARD_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "XXL", "3XL"];

export default function SizeSelector({ sizes = [], selected, onChange }) {
  if (!Array.isArray(sizes) || sizes.length === 0) return null;

  // Preserve all sizes passed, sorted in logical sizing progression
  const ordered = [...sizes].sort((a, b) => {
    const idxA = STANDARD_ORDER.indexOf(a);
    const idxB = STANDARD_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className={styles.wrap} role="group" aria-label="Select size">
      {ordered.map((size) => {
        const isSelected = selected === size || (selected && selected.toLowerCase() === size.toLowerCase());
        return (
          <button
            key={size}
            type="button"
            className={`${styles.btn} ${isSelected ? styles.selected : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (onChange) onChange(size);
            }}
            aria-pressed={isSelected}
            aria-label={`Size ${size}`}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
