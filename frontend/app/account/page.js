import AccountOverview from "@/components/AccountOverview";
import { getUserOrders } from "@/services/api/orderService";

export const metadata = {
  title: "Account Dashboard – Bamboo & Hemp Everyday Essentials",
  description: "View and manage your Bamboo & Hemp account profile and recent orders. [Placeholder]",
};

export default async function AccountPage() {
  const orders = await getUserOrders();
  return <AccountOverview orders={orders} />;
}
