import ShopPageClient from "@/components/ShopPageClient";
import { getAllCategories, getAllProducts, searchProductsAPI } from "@/services/api/productService";

export const metadata = {
  title: "Shop All – Bamboo & Hemp Sustainable Clothing",
  description:
    "Browse our full range of bamboo and hemp everyday clothing — T-shirts and innerwear for men and women. [Placeholder]",
};

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const search = sp?.search || "";

  const [categories, productResult] = await Promise.all([
    getAllCategories(),
    search ? searchProductsAPI(search) : getAllProducts(),
  ]);

  return (
    <ShopPageClient
      key={search}
      initialSearch={search}
      initialCategories={categories}
      initialProducts={productResult.products || []}
      initialTotal={productResult.total ?? 0}
    />
  );
}
