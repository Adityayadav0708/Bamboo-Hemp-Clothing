import Breadcrumb from "@/components/Breadcrumb";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata = {
  title: "Frequently Asked Questions – Bamboo & Hemp Everyday Essentials",
  description:
    "Find answers to common questions about our bamboo & hemp fabrics, sizing, shipping, and return policies. [Placeholder]",
};

const FAQ_ITEMS = [
  {
    q: "Why choose bamboo clothing over traditional cotton?",
    a: "Bamboo fabric is naturally softer than cotton, offers superior moisture-wicking and thermal regulation, and is hypoallergenic. Environmentally, bamboo grass grows without synthetic fertilizers and consumes significantly less water.",
  },
  {
    q: "How does hemp fabric feel against the skin?",
    a: "Modern hemp textiles are finely processed into a soft, lightweight weave similar to fine linen or washed cotton. Unlike synthetic fibers, hemp breathes naturally and softens with each subsequent wash without degrading.",
  },
  {
    q: "How should I wash and care for my bamboo and hemp garments?",
    a: "We recommend gentle machine washing in cold water using a mild, eco-friendly liquid detergent. Avoid chlorine bleach or fabric softeners. Line drying in the shade is best for preserving the fibers and reducing energy usage.",
  },
  {
    q: "What is your shipping policy within India?",
    a: "We offer Free Standard Delivery across India on all orders exceeding ₹999. Orders below ₹999 incur a flat ₹99 shipping fee. Delivery typically takes 3 to 5 business days for major metropolitan areas.",
  },
  {
    q: "Can I return or exchange an item if the size doesn't fit?",
    a: "Yes! We offer a 15-day return and exchange policy on all unworn, unwashed outerwear T-shirts with original tags attached. Due to hygiene regulations, innerwear packs cannot be returned once opened unless defective.",
  },
  {
    q: "Where are your garments manufactured?",
    a: "Our fabrics are sustainably spun, dyed, and tailored in audited ethical manufacturing facilities across India adhering to fair labor practices. [Company to confirm exact facility certifications].",
  },
];

export default function FaqPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", padding: "var(--space-7) 0 var(--space-10)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 var(--container-pad)" }}>
        <Breadcrumb items={[{ label: "FAQ" }]} />

        <div style={{ textAlign: "center", marginBottom: "var(--space-8)" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: "600", color: "var(--color-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Got Questions?
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: "700", color: "var(--color-text)", marginTop: "var(--space-2)", marginBottom: "var(--space-3)" }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--text-base)" }}>
            Find answers on materials, sizing, orders, and sustainability practices.
          </p>
        </div>

        <FaqAccordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
