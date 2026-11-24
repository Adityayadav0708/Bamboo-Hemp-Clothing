"use client";
import { useState, useEffect } from "react";
import { api, formatRupees } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminInventoryPage() {
  const [data, setData] = useState(null);
  const [adjustingVar, setAdjustingVar] = useState(null);
  const [deltaQty, setDeltaQty] = useState(10);
  const [reason, setReason] = useState("purchase_receipt");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setData(api.getAdminData());
    if (typeof api.syncWithBackend === "function") {
      api.syncWithBackend().then((fresh) => {
        if (fresh) setData(fresh);
      });
    }
  }, []);

  const handleApplyAdjustment = () => {
    if (!adjustingVar) return;
    api.adjustStock(adjustingVar.id, parseInt(deltaQty, 10), reason);
    setData(api.getAdminData());
    setAdjustingVar(null);
    setNotice(`Stock adjusted for SKU ${adjustingVar.sku}`);
    setTimeout(() => setNotice(""), 3000);
  };

  if (!data) return <div>Loading Inventory...</div>;

  return (
    <div className={styles.container}>
      {notice && <div className={styles.toastNotice}>{notice}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Inventory &amp; Stock Movements</h1>
          <p className={styles.subtitle}>
            Atomic stock tracking with reason codes (PRD Section 43). Threshold: &le; 5 units.
          </p>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      {adjustingVar && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: "2rem",
            width: "90%",
            maxWidth: "460px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem" }}>Stock Adjustment</h3>
            <p style={{ margin: "0 0 1.25rem", fontSize: "0.875rem", color: "#666" }}>
              SKU: <strong>{adjustingVar.sku}</strong> ({adjustingVar.productName} - {adjustingVar.size})
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                Adjustment Quantity (+/-)
              </label>
              <input
                type="number"
                value={deltaQty}
                onChange={(e) => setDeltaQty(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                Reason Code (PRD Mandated)
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6 }}
              >
                <option value="purchase_receipt">Purchase Receipt (Supplier delivery)</option>
                <option value="manual_correction">Manual Correction (Cycle count)</option>
                <option value="damage">Damage / Write-off</option>
                <option value="return">Customer Return to Stock</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button
                onClick={() => setAdjustingVar(null)}
                style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={handleApplyAdjustment}
                style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#1E412D", color: "#fff", cursor: "pointer" }}
              >
                Confirm Adjustment
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Variant Stock Levels ({data.inventory.length} SKUs)</h2>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Size / Color</th>
                <th>Available Stock</th>
                <th>Reserved</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.inventory.map((v) => {
                const isLow = v.stockQuantity <= v.threshold;
                return (
                  <tr key={v.id}>
                    <td>
                      <code className={styles.skuCode}>{v.sku}</code>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: "#1A201A" }}>{v.productName}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.8125rem" }}>{v.colour} · {v.size}</span>
                    </td>
                    <td>
                      <strong style={{ fontSize: "1rem", color: isLow ? "#B42318" : "#1A201A" }}>
                        {v.stockQuantity}
                      </strong>
                    </td>
                    <td>
                      <span style={{ color: "#6C7A6C" }}>{v.reservedQuantity}</span>
                    </td>
                    <td>
                      <span>{formatRupees(v.pricePaise)}</span>
                    </td>
                    <td>
                      {isLow ? (
                        <span className={styles.lowStockBadge}>Low Stock (&le; {v.threshold})</span>
                      ) : (
                        <span className={`${styles.statusPill} ${styles.delivered}`}>Healthy</span>
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.restockBtn}
                        onClick={() => {
                          setAdjustingVar(v);
                          setDeltaQty(10);
                        }}
                      >
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
