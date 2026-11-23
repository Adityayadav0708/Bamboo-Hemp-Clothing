import ShopPageClient from "@/components/ShopPageClient";

export const metadata = {
  title: "Shop All – Bamboo & Hemp Sustainable Clothing",
  description:
    "Browse our full range of bamboo and hemp everyday clothing — T-shirts and innerwear for men and women. [Placeholder]",
};

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const search = sp?.search || "";
  return <ShopPageClient initialSearch={search} />;
}
