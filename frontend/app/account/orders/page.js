import OrderHistoryList from "@/components/OrderHistoryList";
import { getUserOrders } from "@/services/api/orderService";

export const metadata = {
  title: "My Orders – Bamboo & Hemp Everyday Essentials",
  description: "Track and review all your past and active orders. [Placeholder]",
};

export default async function OrdersPage() {
  const orders = await getUserOrders();
  return <OrderHistoryList orders={orders} />;
}
