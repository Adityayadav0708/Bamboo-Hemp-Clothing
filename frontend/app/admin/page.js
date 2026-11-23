"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { api, formatRupees } from "@/lib/api";
import styles from "./admin.module.css";

export default function AdminOverviewPage() {
  const [data, setData] = useState(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setData(api.getAdminData());
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    api.updateOrderStatus(orderId, newStatus);
    setData(api.getAdminData());
    setNotice(`Order status updated to ${newStatus}`);
    setTimeout(() => setNotice(""), 3000);
  };

  const handleQuickRestock = (variantId) => {
    api.adjustStock(variantId, 10, "purchase_receipt");
    setData(api.getAdminData());
    setNotice("Restocked +10 units successfully");
    setTimeout(() => setNotice(""), 3000);
  };

  if (!data) return <div>Loading Admin Console...</div>;

  const lowStockItems = data.inventory.filter((v) => v.stockQuantity <= v.threshold);

  return (
    <div className={styles.container}>
      {notice && <div className={styles.toastNotice}>{notice}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Store Operations Overview</h1>
          <p className={styles.subtitle}>
            Real-time PRD &amp; ERD metrics across Bamboo &amp; Hemp T-shirts and Innerwear.
          </p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.livePulse}>● Live Sync</span>
        </div>
      </div>

      {/* ── KPI Grid ── */}
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Gross Sales</span>
          <span className={styles.kpiValue}>{formatRupees(data.kpi.grossSalesPaise)}</span>
          <span className={styles.kpiTrend}>↑ 14% vs last week</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Orders</span>
          <span className={styles.kpiValue}>{data.orders.length}</span>
          <span className={styles.kpiSub}>100% Paid</span>
        </div>

        <div className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Awaiting Fulfillment</span>
          <span className={styles.kpiValue}>
            {data.orders.filter((o) => o.orderStatus !== "delivered").length}
          </span>
          <span className={styles.kpiBadge}>Action Needed</span>
        </div>

        <div className={`${styles.kpiCard} ${lowStockItems.length > 0 ? styles.kpiCardAlert : ""}`}>
          <span className={styles.kpiLabel}>Low Stock Alerts</span>
          <span className={styles.kpiValue}>{lowStockItems.length}</span>
          <span className={styles.kpiAlertSub}>Threshold: &le; 5 units</span>
        </div>
      </div>

      {/* ── Two Column Action Sections ── */}
      <div className={styles.twoCol}>
        {/* Recent Orders Section */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Recent Orders (State Machine)</h2>
            <Link href="/admin/orders" className={styles.panelLink}>
              View All Orders &rarr;
            </Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.orders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <span className={styles.orderNum}>{ord.orderNumber}</span>
                    </td>
                    <td>
                      <div className={styles.custName}>{ord.customerName}</div>
                      <div className={styles.custCity}>{ord.shippingCity}</div>
                    </td>
                    <td>
                      <strong>{formatRupees(ord.totalPaise)}</strong>
                    </td>
                    <td>
                      <span className={`${styles.statusPill} ${styles[ord.orderStatus]}`}>
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td>
                      {ord.orderStatus === "confirmed" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleStatusChange(ord.id, "processing")}
                        >
                          Process
                        </button>
                      )}
                      {ord.orderStatus === "processing" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleStatusChange(ord.id, "shipped")}
                        >
                          Ship
                        </button>
                      )}
                      {ord.orderStatus === "shipped" && (
                        <button
                          className={styles.actionBtnSuccess}
                          onClick={() => handleStatusChange(ord.id, "delivered")}
                        >
                          Deliver
                        </button>
                      )}
                      {ord.orderStatus === "delivered" && (
                        <span className={styles.doneText}>Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Low Stock Alerts Section */}
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Low Stock Variants Alert</h2>
            <Link href="/admin/inventory" className={styles.panelLink}>
              Manage Inventory &rarr;
            </Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <code className={styles.skuCode}>{v.sku}</code>
                    </td>
                    <td>
                      <div className={styles.prodName}>{v.productName}</div>
                      <div className={styles.prodVar}>
                        {v.colour} · Size {v.size}
                      </div>
                    </td>
                    <td>
                      <span className={styles.lowStockBadge}>{v.stockQuantity} left</span>
                    </td>
                    <td>
                      <button
                        className={styles.restockBtn}
                        onClick={() => handleQuickRestock(v.id)}
                      >
                        +10 Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
