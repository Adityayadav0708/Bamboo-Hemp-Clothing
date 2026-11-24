"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "./AccountLayout.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/account", icon: "📊" },
  { label: "My Orders", href: "/account/orders", icon: "📦" },
  { label: "Continue Shopping", href: "/shop", icon: "🛍️" },
];

export default function AccountLayout({ children, activeTab = "Dashboard" }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const displayName = user?.fullName || user?.name || "Demo Customer";
  const displayEmail = user?.email || "demo@example.com";

  const navItems = [
    ...NAV_ITEMS,
    ...(user?.role === "admin" || user?.role === "super_admin"
      ? [{ label: "Admin Console", href: "/admin", icon: "🛡️" }]
      : []),
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: activeTab }]} />

        <div className={styles.layout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* User Profile Card */}
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>{displayName}</strong>
                <span className={styles.userEmail}>{displayEmail}</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className={styles.nav}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.navActive : ""}`}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                type="button"
                className={styles.logoutBtn}
                onClick={logout}
              >
                <span className={styles.navIcon}>🚪</span>
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </div>
  );
}
