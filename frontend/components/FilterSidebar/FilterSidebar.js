"use client";
import styles from "./FilterSidebar.module.css";

const SIZES  = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Forest Green", slug: "forest-green", hex: "#244B3C" },
  { name: "Sage Green", slug: "sage-green", hex: "#9BAF95" },
  { name: "Warm Beige", slug: "warm-beige", hex: "#E9E1D2" },
  { name: "Off White", slug: "off-white", hex: "#FAF9F5" },
  { name: "Charcoal", slug: "charcoal", hex: "#292D2A" },
  { name: "Natural", slug: "natural", hex: "#C8B89A" },
];
const PRICE_RANGES = [
  { label: "Under ₹800", min: 0, max: 800 },
  { label: "₹800 – ₹1,200", min: 800, max: 1200 },
  { label: "₹1,200 – ₹1,600", min: 1200, max: 1600 },
  { label: "Above ₹1,600", min: 1600, max: 10000 },
];

export default function FilterSidebar({ filters, onChange, categories = [], onReset }) {
  function set(key, value) {
    onChange({ ...filters, [key]: filters[key] === value ? "" : value });
  }
  function setPrice(min, max) {
    onChange({ ...filters, minPrice: min, maxPrice: max });
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
            {cat.shortName}
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
          {COLORS.map((c) => (
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
