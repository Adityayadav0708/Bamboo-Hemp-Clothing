"use client";
import { useState, useEffect } from "react";
import { api, formatRupees } from "@/lib/api";
import styles from "../admin.module.css";

const ALL_STATUSES = ["all", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setData(api.getAdminData());
  }, []);

  const handleTransition = (orderId, newStatus) => {
    api.updateOrderStatus(orderId, newStatus);
    setData(api.getAdminData());
    setNotice(`Order transition to ${newStatus} recorded in Audit Log`);
    setTimeout(() => setNotice(""), 3000);
  };

  if (!data) return <div>Loading Orders...</div>;

  const filteredOrders =
    filter === "all"
      ? data.orders
      : data.orders.filter((o) => o.orderStatus === filter);

  return (
    <div className={styles.container}>
      {notice && <div className={styles.toastNotice}>{notice}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Orders &amp; Fulfillment</h1>
          <p className={styles.subtitle}>
            Order state machine fulfillment lifecycle (PRD Section 45).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {ALL_STATUSES.map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              border: filter === st ? "1px solid #1E412D" : "1px solid #E0EAE0",
              background: filter === st ? "#1E412D" : "#FFFFFF",
              color: filter === st ? "#FFFFFF" : "#3A453A",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {st}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Customer Orders ({filteredOrders.length})</h2>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Customer &amp; Shipping</th>
                <th>Items Snapshot</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Transition</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((ord) => (
                <tr key={ord.id}>
                  <td>
                    <span className={styles.orderNum}>{ord.orderNumber}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.75rem", color: "#6C7A6C" }}>
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td>
                    <div className={styles.custName}>{ord.customerName}</div>
                    <div style={{ fontSize: "0.75rem", color: "#556255" }}>{ord.customerEmail}</div>
                    <div className={styles.custCity}>{ord.shippingCity}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem", color: "#1A201A" }}>{ord.itemSummary}</span>
                  </td>
                  <td>
                    <strong>{formatRupees(ord.totalPaise)}</strong>
                  </td>
                  <td>
                    <span style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      background: "#ECFDF3",
                      color: "#027A48",
                      padding: "2px 6px",
                      borderRadius: 4,
                      textTransform: "uppercase"
                    }}>
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`${styles.statusPill} ${styles[ord.orderStatus]}`}>
                      {ord.orderStatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                      {ord.orderStatus === "confirmed" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleTransition(ord.id, "processing")}
                        >
                          Mark Processing
                        </button>
                      )}
                      {ord.orderStatus === "processing" && (
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleTransition(ord.id, "shipped")}
                        >
                          Mark Shipped
                        </button>
                      )}
                      {ord.orderStatus === "shipped" && (
                        <button
                          className={styles.actionBtnSuccess}
                          onClick={() => handleTransition(ord.id, "delivered")}
                        >
                          Mark Delivered
                        </button>
                      )}
                      {ord.orderStatus !== "delivered" && ord.orderStatus !== "cancelled" && (
                        <button
                          onClick={() => handleTransition(ord.id, "cancelled")}
                          style={{
                            background: "none",
                            border: "1px solid #FDA29B",
                            color: "#B42318",
                            padding: "3px 8px",
                            borderRadius: 4,
                            fontSize: "0.6875rem",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
