/**
 * formatters.js
 * Utility functions for formatting prices, dates, and text.
 */

/** Format a number as Indian Rupee currency. */
export function formatPrice(amount, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Format a date string to a readable format. */
export function formatDate(dateString, options = {}) {
  const defaults = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-IN", { ...defaults, ...options }).format(
    new Date(dateString)
  );
}

/** Truncate text to a given character limit with ellipsis. */
export function truncate(text, limit = 100) {
  if (!text || text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + "…";
}

/** Capitalise first letter of each word. */
export function titleCase(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Convert a slug to a readable label. */
export function slugToLabel(slug) {
  if (!slug) return "";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Calculate discount percentage. */
export function discountPercent(original, sale) {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}
