"use client";
import styles from "./FilterSidebar.module.css";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const DEFAULT_COLORS = [
  { name: "Pitch Black", slug: "pitch-black", hex: "#1A1A1A" },
  { name: "Charcoal Grey", slug: "charcoal-grey", hex: "#4A4D4A" },
  { name: "Navy Blue", slug: "navy-blue", hex: "#1E2B4D" },
  { name: "Cloud White", slug: "cloud-white", hex: "#FAF9F5" },
  { name: "Forest Green", slug: "forest-green", hex: "#244B3C" },
  { name: "Sage Green", slug: "sage-green", hex: "#9BAF95" },
  { name: "Natural Sand", slug: "natural-sand", hex: "#E2DCCE" },
];
const PRICE_RANGES = [
  { label: "Under ₹800", min: 0, max: 800 },
  { label: "₹800 – ₹1,200", min: 800, max: 1200 },
  { label: "₹1,200 – ₹1,600", min: 1200, max: 1600 },
  { label: "Above ₹1,600", min: 1600, max: 10000 },
];

export default function FilterSidebar({
  filters,
  onChange,
  categories = [],
  availableColors = null,
  onReset,
}) {
  const colorOptions =
    Array.isArray(availableColors) && availableColors.length > 0
      ? availableColors
      : DEFAULT_COLORS;

  function set(key, value) {
    onChange({ ...filters, [key]: filters[key] === value ? "" : value });
  }
  function setPrice(min, max) {
    const isSame = filters.minPrice === min && filters.maxPrice === max;
    onChange({
      ...filters,
      minPrice: isSame ? 0 : min,
      maxPrice: isSame ? 10000 : max,
    });
  }

  const hasActive = Object.entries(filters).some(([k, v]) =>
    k !== "maxPrice" ? !!v : v !== 10000
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHead}>
        <span className={styles.sidebarTitle}>Filters</span>
        {hasActive && (
          <button className={styles.resetBtn} onClick={onReset}>Clear all</button>
        )}
      </div>

      {/* Category */}
      <FilterGroup title="Category">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={`${styles.chip} ${filters.category === cat.slug ? styles.chipActive : ""}`}
            onClick={() => set("category", cat.slug)}
            aria-pressed={filters.category === cat.slug}
          >
            {cat.shortName || cat.name}
          </button>
        ))}
      </FilterGroup>

      {/* Size */}
      <FilterGroup title="Size">
        {SIZES.map((s) => (
          <button
            key={s}
            className={`${styles.sizeChip} ${filters.size === s ? styles.chipActive : ""}`}
            onClick={() => set("size", s)}
            aria-pressed={filters.size === s}
          >
            {s}
          </button>
        ))}
      </FilterGroup>

      {/* Color */}
      <FilterGroup title="Colour">
        <div className={styles.colorRow}>
          {colorOptions.map((c) => (
            <button
              key={c.slug}
              className={`${styles.colorDot} ${filters.color === c.slug ? styles.colorActive : ""}`}
              style={{ "--hex": c.hex }}
              onClick={() => set("color", c.slug)}
              aria-pressed={filters.color === c.slug}
              aria-label={c.name}
              title={c.name}
            />
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price Range">
        {PRICE_RANGES.map((r) => (
          <button
            key={r.label}
            className={`${styles.chip} ${
              filters.minPrice === r.min && filters.maxPrice === r.max ? styles.chipActive : ""
            }`}
            onClick={() => setPrice(r.min, r.max)}
          >
            {r.label}
          </button>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.groupContent}>{children}</div>
    </div>
  );
}
