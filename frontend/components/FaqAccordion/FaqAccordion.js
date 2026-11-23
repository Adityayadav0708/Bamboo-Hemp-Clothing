"use client";
import { useState } from "react";
import styles from "./FaqAccordion.module.css";

export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  function toggle(idx) {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.q} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
            >
              <span className={styles.question}>{item.q}</span>
              <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className={styles.content}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
