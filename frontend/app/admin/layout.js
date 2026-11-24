"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./AdminLayout.module.css";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "👕" },
  { label: "Inventory", href: "/admin/inventory", icon: "📦" },
  { label: "Orders", href: "/admin/orders", icon: "📑" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: "🛡️" },
];

function getInitials(name = "") {
  return (
    name
      .replace(/\(.*?\)/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0].toUpperCase())
      .join("") || "A"
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, loading, logout } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/account");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  // Gate rendering before auth verification completes to prevent unauthorized UI flashes or API calls
  if (loading || !isAuthenticated || !isAdmin) {
    return (
      <div className={styles.guardScreen}>
        <LoadingSpinner
          size="lg"
          label={loading ? "Verifying administrator session…" : "Redirecting…"}
        />
        <p className={styles.guardText}>
          {loading
            ? "Verifying administrator access…"
            : !isAuthenticated
            ? "Authentication required. Redirecting to sign in…"
            : "Access restricted. Redirecting to your account…"}
        </p>
      </div>
    );
  }

  const initials = getInitials(user?.fullName || user?.name || user?.email);
  const roleLabel = (user?.role || "admin").toUpperCase();

  return (
    <div className={styles.wrapper}>
      {/* ── Top Bar ── */}
      <header className={styles.topbar}>
        <div className={styles.brandRow}>
          <Link href="/admin" className={styles.brandLogo}>
            <span className={styles.logoBadge}>BH</span>
            <span className={styles.brandTitle}>Admin Console</span>
          </Link>
          <span className={styles.roleTag}>{roleLabel}</span>
        </div>

        <div className={styles.userControls}>
          <Link href="/" className={styles.storefrontLink}>
            &larr; View Storefront
          </Link>
          <div className={styles.avatar} title={user?.email || "Administrator"}>
            {initials}
          </div>
          <button type="button" onClick={logout} className={styles.logoutBtn}>
            Sign Out
          </button>
        </div>
      </header>

      <div className={styles.body}>
        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarHeading}>MANAGEMENT</span>
            <nav className={styles.nav}>
              {ADMIN_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  >
                    <span className={styles.navIcon}>{link.icon}</span>
                    <span className={styles.navLabel}>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className={styles.complianceCard}>
            <h4>PRD v2.0 Compliance</h4>
            <p>Monetary storage: Integer Paise</p>
            <p>Audit logging: Active (Immutable)</p>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
