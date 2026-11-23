import { notFound } from "next/navigation";
import OrderDetailView from "@/components/OrderDetailView";
import { getOrderById } from "@/services/api/orderService";

export function generateStaticParams() {
  return [
    { id: "ORD-20241101-001" },
    { id: "ORD-20241115-002" },
  ];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Order Details #${id} – Bamboo & Hemp`,
    description: `Track delivery progress and view items for order #${id}.`,
  };
}

export default async function OrderDetailPage({ params }) {
  const { id } = await params;
  try {
    const order = await getOrderById(id);
    if (!order) notFound();
    return <OrderDetailView order={order} />;
  } catch {
    notFound();
  }
}
