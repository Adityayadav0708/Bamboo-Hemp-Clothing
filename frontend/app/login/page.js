import LoginForm from "@/components/LoginForm";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "Sign In – Bamboo & Hemp Everyday Essentials",
  description: "Sign in to your customer account to view your orders, delivery status, and saved preferences.",
};

export default function LoginPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", minHeight: "80vh", padding: "var(--space-7) var(--container-pad)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", marginBottom: "var(--space-6)" }}>
        <Breadcrumb items={[{ label: "Sign In" }]} />
      </div>
      <LoginForm />
    </div>
  );
}
