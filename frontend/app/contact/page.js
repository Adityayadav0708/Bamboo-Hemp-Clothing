import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us – Bamboo & Hemp Everyday Essentials",
  description:
    "Get in touch with our customer support team for inquiries, sizing questions, or bulk orders. [Placeholder]",
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", padding: "var(--space-7) 0 var(--space-10)" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-pad)" }}>
        <Breadcrumb items={[{ label: "Contact Us" }]} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-9)", marginTop: "var(--space-5)" }}>
          {/* Info Side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
            <div>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: "600", color: "var(--color-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                We&apos;re Here to Help
              </span>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: "700", color: "var(--color-text)", marginTop: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                Get in Touch
              </h1>
              <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-base)", lineHeight: "1.7" }}>
                Have a question about our bamboo fabric blends, sizing recommendations, or your recent order? Reach out and we&apos;ll be happy to assist.
              </p>
            </div>

            {/* Support cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <span style={{ fontSize: "1.75rem" }}>📧</span>
                <div>
                  <strong style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--color-text)" }}>Customer Support</strong>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>care@bamboo-hemp-placeholder.com</span>
                </div>
              </div>

              <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <span style={{ fontSize: "1.75rem" }}>📞</span>
                <div>
                  <strong style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--color-text)" }}>Helpline (Mon - Sat, 10 AM - 7 PM IST)</strong>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>+91 (080) 4567-8900 [Placeholder]</span>
                </div>
              </div>

              <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--space-5)", display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                <span style={{ fontSize: "1.75rem" }}>📍</span>
                <div>
                  <strong style={{ display: "block", fontSize: "var(--text-sm)", color: "var(--color-text)" }}>Headquarters / Studio</strong>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>102 Green Enclave, Indiranagar, Bengaluru, KA - 560038 [Placeholder]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", padding: "var(--space-8)" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", fontWeight: "700", color: "var(--color-text)", marginBottom: "var(--space-5)" }}>
              Send an Inquiry
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
