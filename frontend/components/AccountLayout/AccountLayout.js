"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { isAdminRole } from "@/services/api/authService";
import Breadcrumb from "@/components/Breadcrumb";
import LoadingSpinner from "@/components/LoadingSpinner";
import styles from "./AccountLayout.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/account", icon: "📊" },
  { label: "My Orders", href: "/account/orders", icon: "📦" },
  { label: "Continue Shopping", href: "/shop", icon: "🛍️" },
];

export default function AccountLayout({ children, activeTab = "Dashboard" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className={styles.guardScreen}>
        <LoadingSpinner size="lg" label="Checking account session…" />
        <p className={styles.guardText}>
          {loading ? "Loading your account…" : "Redirecting to sign in…"}
        </p>
      </div>
    );
  }

  const displayName = user?.fullName || user?.name || "Customer";
  const displayEmail = user?.email || "";

  const navItems = [
    ...NAV_ITEMS,
    ...(isAdminRole(user?.role)
      ? [{ label: "Admin Console", href: "/admin", icon: "🛡️" }]
      : []),
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: activeTab }]} />

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <strong className={styles.userName}>{displayName}</strong>
                <span className={styles.userEmail}>{displayEmail}</span>
              </div>
            </div>

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

          <main className={styles.mainContent}>{children}</main>
        </div>
      </div>
    </div>
  );
}
