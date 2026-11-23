"use client";
import styles from "./QuantitySelector.module.css";

export default function QuantitySelector({ value = 1, onChange, min = 1, max = 10 }) {
  function decrement() { if (value > min) onChange(value - 1); }
  function increment() { if (value < max) onChange(value + 1); }

  return (
    <div className={styles.wrap} role="group" aria-label="Quantity">
      <button
        className={styles.btn}
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        type="button"
      >
        −
      </button>
      <span className={styles.value} aria-live="polite" aria-label={`Quantity: ${value}`}>
        {value}
      </span>
      <button
        className={styles.btn}
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase quantity"
        type="button"
      >
        +
      </button>
    </div>
  );
}
