"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import styles from "./MobileNavigation.module.css";

export default function MobileNavigation({ isOpen, onClose, links }) {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const drawerRef = useRef(null);

  // Trap focus & lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        tabIndex={-1}
      >
        {/* Header */}
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>🌿 &nbsp;Menu</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <nav className={styles.navList} aria-label="Mobile navigation">
          {links.map((link) =>
            link.children ? (
              <div key={link.label} className={styles.group}>
                <span className={styles.groupLabel}>{link.label}</span>
                <div className={styles.groupItems}>
                  {link.children.map((child) => (
                    <Link key={child.label} href={child.href} className={styles.link} onClick={onClose}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={link.label} href={link.href} className={styles.link} onClick={onClose}>
                {link.label}
              </Link>
            )
          )}
        </nav>

        <hr className={styles.divider} />

        {/* Auth & Cart */}
        <div className={styles.footer}>
          <Link href="/cart" className={styles.footerLink} onClick={onClose}>
            🛒 Cart
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </Link>

          {user ? (
            <>
              <Link href="/account" className={styles.footerLink} onClick={onClose}>
                👤 My Account
              </Link>
              <button
                className={styles.footerLink}
                onClick={() => { logout(); onClose(); }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.footerLink} onClick={onClose}>
                Sign In
              </Link>
              <Link href="/register" className={`${styles.footerLink} ${styles.footerLinkCta}`} onClick={onClose}>
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
