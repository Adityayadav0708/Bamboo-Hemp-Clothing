"use client";
import styles from "./ColorSelector.module.css";

export default function ColorSelector({ colors = [], selected, onChange }) {
  return (
    <div className={styles.wrap} role="group" aria-label="Select color">
      {colors.map((color) => (
        <button
          key={color.slug}
          type="button"
          className={`${styles.swatch} ${selected === color.slug ? styles.selected : ""}`}
          style={{ "--c": color.hex }}
          onClick={() => onChange(color.slug)}
          aria-pressed={selected === color.slug}
          aria-label={color.name}
          title={color.name}
        />
      ))}
    </div>
  );
}
