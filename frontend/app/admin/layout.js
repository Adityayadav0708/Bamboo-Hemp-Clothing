"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminLayout.module.css";

const ADMIN_LINKS = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Products", href: "/admin/products", icon: "👕" },
  { label: "Inventory", href: "/admin/inventory", icon: "📦" },
  { label: "Orders", href: "/admin/orders", icon: "📑" },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: "🛡️" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      {/* ── Top Bar ── */}
      <header className={styles.topbar}>
        <div className={styles.brandRow}>
          <Link href="/admin" className={styles.brandLogo}>
            <span className={styles.logoBadge}>BH</span>
            <span className={styles.brandTitle}>Admin Console</span>
          </Link>
          <span className={styles.roleTag}>SUPER_ADMIN</span>
        </div>

        <div className={styles.userControls}>
          <Link href="/" className={styles.storefrontLink}>
            &larr; View Storefront
          </Link>
          <div className={styles.avatar}>AY</div>
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
