import { notFound } from "next/navigation";
import { MOCK_PRODUCTS, getProductBySlug, getRelatedProducts } from "@/data/products";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
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
  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.category, 4);

  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
