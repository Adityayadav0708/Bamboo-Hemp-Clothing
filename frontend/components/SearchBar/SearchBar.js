"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onClose, autoFocus = false }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/shop?search=${encodeURIComponent(q)}`);
    onClose?.();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <label htmlFor="site-search" className="sr-only">Search products</label>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          className={styles.input}
          placeholder="Search for bamboo tees, hemp innerwear…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>
      <button type="submit" className={styles.submitBtn}>Search</button>
      {onClose && (
        <button type="button" className={styles.cancelBtn} onClick={onClose} aria-label="Close search">
          Cancel
        </button>
      )}
    </form>
  );
}
