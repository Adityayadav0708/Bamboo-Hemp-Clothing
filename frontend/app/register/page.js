import RegisterForm from "@/components/RegisterForm";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "Create Account – Bamboo & Hemp Everyday Essentials",
  description: "Register for a new customer account to enjoy seamless checkout, track deliveries, and join our sustainable fashion community.",
};

export default function RegisterPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", minHeight: "80vh", padding: "var(--space-7) var(--container-pad)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", marginBottom: "var(--space-6)" }}>
        <Breadcrumb items={[{ label: "Create Account" }]} />
      </div>
      <RegisterForm />
    </div>
  );
}
