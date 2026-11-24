import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlugAPI,
  getRelatedProductsAPI,
} from "@/services/api/productService";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const { products } = await getAllProducts({ limit: 100 });
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlugAPI(slug);
  if (!product) {
    return {
      title: "Product Not Found | Bamboo & Hemp",
    };
  }

  return {
    title: `${product.name} – Bamboo & Hemp Everyday Essentials`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlugAPI(slug);
  if (!product) {
    notFound();
  }

  const related = await getRelatedProductsAPI(product._id || product.id || product.slug, product.category, 4);

  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
