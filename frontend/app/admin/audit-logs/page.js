"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import styles from "../admin.module.css";

export default function AdminAuditLogsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(api.getAdminData());
    if (typeof api.syncWithBackend === "function") {
      api.syncWithBackend().then((fresh) => {
        if (fresh) setData(fresh);
      });
    }
  }, []);

  if (!data) return <div>Loading Audit Logs...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Immutable Audit Trail</h1>
          <p className={styles.subtitle}>
            Append-only security log of all admin mutations and state transitions (PRD Section 46).
          </p>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Audit Events ({data.auditLogs.length} Records)</h2>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Event Summary</th>
              </tr>
            </thead>
            <tbody>
              {data.auditLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#6C7A6C" }}>
                      {new Date(log.timestamp).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </td>
                  <td>
                    <div>
                      <span style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        background: "#EBF3EA",
                        color: "#1E412D",
                        padding: "2px 6px",
                        borderRadius: 4,
                        textTransform: "uppercase",
                      }}>
                        {log.actorRole}
                      </span>
                      <div style={{ fontSize: "0.75rem", color: "#6C7A6C", marginTop: "2px" }}>
                        {log.actorEmail}
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className={styles.skuCode}>{log.action}</code>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                      {log.resourceType}
                    </span>
                    <div style={{ fontSize: "0.6875rem", color: "#6C7A6C" }}>
                      {log.resourceId}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8125rem", color: "#1A201A" }}>
                      {log.summary}
                    </span>
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
