import { notFound } from "next/navigation";
import Image from "next/image";
import {
  getAllCategories,
  getCategoryBySlugAPI,
  getProductsByCategoryAPI,
} from "@/services/api/productService";
import ShopPageClient from "@/components/ShopPageClient";
import Breadcrumb from "@/components/Breadcrumb";
import styles from "./CategoryPage.module.css";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = await getCategoryBySlugAPI(slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: `${cat.name} – Bamboo & Hemp`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const [category, categories, productResult] = await Promise.all([
    getCategoryBySlugAPI(slug),
    getAllCategories(),
    getProductsByCategoryAPI(slug),
  ]);

  if (!category) notFound();

  const products = productResult.products || [];

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

      {/* Product grid with filters synced to live catalogue API */}
      <ShopPageClient
        key={slug}
        initialCategory={slug}
        initialCategories={categories}
        initialProducts={products}
        initialTotal={productResult.total ?? products.length}
      />
    </div>
  );
}
