import ProductCard from "@/components/ProductCard";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products = [], columns = 4 }) {
  if (!products.length) return null;
  return (
    <div
      className={styles.grid}
      style={{ "--cols": columns }}
      role="list"
      aria-label="Products"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
