import { notFound } from "next/navigation";
import Image from "next/image";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ShopPageClient from "@/components/ShopPageClient";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "./CategoryPage.module.css";

// Generate static params for all known category slugs
export function generateStaticParams() {
  return [
    { slug: "bamboo-tshirts" },
    { slug: "hemp-tshirts" },
    { slug: "mens-innerwear" },
    { slug: "womens-innerwear" },
  ];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} – Bamboo & Hemp`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div>
      {/* Category Banner */}
      <div className={styles.banner}>
        <div className={styles.bannerImg}>
          <Image
            src={category.bannerImage}
            alt={category.name}
            fill
            priority
            className={styles.bannerImgEl}
            sizes="100vw"
          />
          <div className={styles.bannerFallback} aria-hidden="true">
            <span>🌿</span>
          </div>
          <div className={styles.bannerOverlay} />
        </div>
        <div className={styles.bannerContent}>
          <Breadcrumb items={[{ label: "Shop", href: "/shop" }, { label: category.name }]} />
          <h1 className={styles.bannerTitle}>{category.name}</h1>
          <p className={styles.bannerDesc}>{category.description}</p>
          <span className={styles.bannerCount}>{products.length} products</span>
        </div>
      </div>

      {/* Product grid with filters (reuses ShopPageClient filtered to this category) */}
      <ShopPageClient initialCategory={slug} />
    </div>
  );
}
