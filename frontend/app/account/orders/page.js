import OrderHistoryList from "@/components/OrderHistoryList";

export const metadata = {
  title: "My Orders – Bamboo & Hemp Everyday Essentials",
  description: "Track and review all your past and active orders.",
};

export default function OrdersPage() {
  return <OrderHistoryList />;
}
