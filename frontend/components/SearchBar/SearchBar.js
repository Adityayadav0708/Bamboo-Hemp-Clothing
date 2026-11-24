"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchProductsAPI } from "@/services/api/productService";
import { formatPrice } from "@/utils/formatters";
import styles from "./SearchBar.module.css";

export default function SearchBar({ onClose, autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      return;
    }

    let cancelled = false;
    const timer = setTimeout(() => {
      setSearching(true);
      searchProductsAPI(q, { limit: 5 })
        .then((res) => {
          if (!cancelled) {
            setResults(res?.products || []);
            setOpenDropdown(true);
          }
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setSearching(false);
        });
    }, 220);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpenDropdown(false);
    router.push(`/shop?search=${encodeURIComponent(q)}`);
    onClose?.();
  }

  const trimmed = query.trim();
  const showDropdown = openDropdown && trimmed.length >= 2;

  return (
    <div className={styles.wrap}>
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
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              if (val.trim().length < 2) {
                setOpenDropdown(false);
                setResults([]);
              }
            }}
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

      {showDropdown && (
        <div className={styles.dropdown} role="listbox" aria-label="Search suggestions">
          {searching ? (
            <div className={styles.dropdownStatus}>Searching catalogue…</div>
          ) : results.length > 0 ? (
            <>
              {results.map((item) => (
                <Link
                  key={item.id || item.slug}
                  href={`/product/${item.slug}`}
                  className={styles.resultItem}
                  onClick={() => {
                    setOpenDropdown(false);
                    onClose?.();
                  }}
                >
                  <Image
                    src={item.images?.[0] || "/images/products/heelium-men-tee-black.png"}
                    alt={item.name}
                    width={40}
                    height={44}
                    className={styles.resultThumb}
                  />
                  <div className={styles.resultInfo}>
                    <span className={styles.resultName}>{item.name}</span>
                    <span className={styles.resultMeta}>{item.categoryLabel}</span>
                  </div>
                  <span className={styles.resultPrice}>{formatPrice(item.price)}</span>
                </Link>
              ))}
              <button
                type="button"
                className={styles.viewAllBtn}
                onClick={handleSubmit}
              >
                View all results for &ldquo;{trimmed}&rdquo; →
              </button>
            </>
          ) : (
            <div className={styles.dropdownStatus}>No products matched &ldquo;{trimmed}&rdquo;</div>
          )}
        </div>
      )}
    </div>
  );
}
