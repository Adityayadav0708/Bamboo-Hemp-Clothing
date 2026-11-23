import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = {
  title: "Reset Password – Bamboo & Hemp Everyday Essentials",
  description: "Recover your account credentials securely with your registered email address.",
};

export default function ForgotPasswordPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", minHeight: "80vh", padding: "var(--space-7) var(--container-pad)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", marginBottom: "var(--space-6)" }}>
        <Breadcrumb items={[{ label: "Sign In", href: "/login" }, { label: "Reset Password" }]} />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
