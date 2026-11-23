"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { api, formatRupees } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminProductsPage() {
  const [data, setData] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setData(api.getAdminData());
  }, []);

  const handleStartEdit = (p) => {
    setEditingId(p.id);
    setEditPrice((p.pricePaise / 100).toString());
  };

  const handleSavePrice = (productId) => {
    const val = parseFloat(editPrice);
    if (isNaN(val) || val <= 0) return;
    api.updateProductPrice(productId, val);
    setData(api.getAdminData());
    setEditingId(null);
    setNotice("Price updated successfully");
    setTimeout(() => setNotice(""), 3000);
  };

  if (!data) return <div>Loading Products...</div>;

  return (
    <div className={styles.container}>
      {notice && <div className={styles.toastNotice}>{notice}</div>}

      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products &amp; Variants Management</h1>
          <p className={styles.subtitle}>
            Manage catalogue, pricing in ₹ (stored in integer paise), and fabric composition.
          </p>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Product Catalogue ({data.products.length} Items)</h2>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Fabric Composition</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ position: "relative", width: 44, height: 44, borderRadius: 6, overflow: "hidden", background: "#f0ede6" }}>
                        <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#1A201A" }}>{p.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6C7A6C" }}>{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem", color: "#3A453A" }}>{p.category}</span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.75rem", color: "#556255" }}>
                      {p.fabricComposition.map((f) => `${f.percentage}% ${f.material}`).join(" + ")}
                    </span>
                  </td>
                  <td>
                    {editingId === p.id ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          style={{ width: "80px", padding: "4px 8px", border: "1px solid #234938", borderRadius: 4 }}
                        />
                        <button
                          onClick={() => handleSavePrice(p.id)}
                          style={{ background: "#234938", color: "#fff", border: "none", padding: "4px 8px", borderRadius: 4, cursor: "pointer" }}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <strong>{formatRupees(p.pricePaise)}</strong>
                        {p.compareAtPricePaise && (
                          <div style={{ fontSize: "0.75rem", color: "#8C998C", textDecoration: "line-through" }}>
                            {formatRupees(p.compareAtPricePaise)}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{p.totalStock} units</span>
                  </td>
                  <td>
                    <span className={`${styles.statusPill} ${styles.delivered}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={styles.restockBtn}
                      onClick={() => handleStartEdit(p)}
                    >
                      Edit Price
                    </button>
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
