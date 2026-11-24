"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import MobileNavigation from "@/components/MobileNavigation";
import SearchBar from "@/components/SearchBar";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "T-Shirts", href: "/category/bamboo-tshirts" },
  { label: "Innerwear", href: "/category/mens-innerwear" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          {/* ── Brand Logo ── */}
          <Link href="/" className={styles.logo} aria-label="Go to homepage">
            <div className={styles.logoBadge}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2L14.5 9H21.5L16 13.5L18 20.5L12 16.5L6 20.5L8 13.5L2.5 9H9.5L12 2Z"
                  stroke="#234938"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="2.5" fill="#234938" />
              </svg>
            </div>
            <span className={styles.brandTitle}>BAMBOO &amp; HEMP</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Actions ── */}
          <div className={styles.actions}>
            {/* Search */}
            <button
              className={styles.iconBtn}
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Open search"
              aria-expanded={searchOpen}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Shopping Bag / Cart */}
            <Link
              href="/cart"
              className={styles.cartBtn}
              aria-label={`Shopping bag — ${itemCount} items`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && (
                <span className={styles.cartBadge} aria-live="polite">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Account Profile circle */}
            <Link
              href={user ? "/account" : "/login"}
              className={styles.accountCircleBtn}
              aria-label={user ? "My account" : "Sign in"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </Link>

            {/* Admin Console Shortcut for Admins */}
            {(user?.role === "admin" || user?.role === "super_admin") && (
              <Link
                href="/admin"
                className={styles.accountCircleBtn}
                title="Admin Console"
                aria-label="Admin Console"
                style={{
                  background: "#234938",
                  color: "#FAF9F5",
                  fontWeight: 700,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.5px",
                }}
              >
                ADM
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out search drawer */}
      {searchOpen && (
        <div className={styles.searchDrawer}>
          <div className={styles.searchInner}>
            <SearchBar autoFocus onSelect={() => setSearchOpen(false)} />
            <button
              className={styles.closeSearch}
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <MobileNavigation
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        user={user}
        itemCount={itemCount}
      />
    </>
  );
}
