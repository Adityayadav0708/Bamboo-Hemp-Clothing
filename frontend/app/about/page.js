import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";

export const metadata = {
  title: "About Us – Bamboo & Hemp Everyday Essentials",
  description:
    "Learn about our mission to bring sustainable, biodegradable bamboo and hemp clothing to modern Indian wardrobes.",
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--color-bg-light)", padding: "var(--space-7) 0 var(--space-10)", width: "100%" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 var(--container-pad)" }}>
        <Breadcrumb items={[{ label: "About Us" }]} />

        {/* Hero Section */}
        <section style={{ textAlign: "center", maxWidth: "760px", margin: "var(--space-6) auto var(--space-9)" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: "600", color: "var(--color-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Our Mission &amp; Purpose
          </span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: "700", color: "var(--color-text)", marginTop: "var(--space-2)", marginBottom: "var(--space-4)" }}>
            Redefining Everyday Essentials with Nature&apos;s Superfibres
          </h1>
          <p style={{ fontSize: "var(--text-lg)", color: "var(--color-text-muted)", lineHeight: "1.7" }}>
            We believe you shouldn&apos;t have to choose between personal comfort and the health of our planet. Our t-shirts and innerwear are crafted exclusively from organically harvested bamboo and resilient Himalayan hemp.
          </p>
        </section>

        {/* Grid 1: The Fibres */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-10)" }}>
          {/* Bamboo Card */}
          <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", width: "100%", height: "220px" }}>
              <Image
                src="/images/about/about-bamboo.jpg"
                alt="Organic bamboo textile and fiber"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "var(--space-6)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", color: "var(--color-primary)", marginBottom: "var(--space-2)" }}>
                The Bamboo Miracle
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: "var(--text-sm)" }}>
                Bamboo is the fastest-growing grass on earth. It requires zero synthetic chemical pesticides and uses up to 30% less water than conventional cotton. The result is a cloud-soft, naturally cooling textile that breathes effortlessly in Indian weather.
              </p>
            </div>
          </div>

          {/* Hemp Card */}
          <div style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-2xl)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ position: "relative", width: "100%", height: "220px" }}>
              <Image
                src="/images/about/about-hemp.jpg"
                alt="Heritage Himalayan hemp textile and fabric"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "var(--space-6)" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-2xl)", color: "var(--color-primary)", marginBottom: "var(--space-2)" }}>
                The Hemp Resilience
              </h2>
              <p style={{ color: "var(--color-text-muted)", lineHeight: "1.7", fontSize: "var(--text-sm)" }}>
                Hemp is one of humanity’s oldest cultivated superfibres. Rain-fed in the Himalayas, it enriches the soil, absorbs carbon at record rates, and yields durable fibers that get softer with every single wash, ensuring essentials that outlast fast fashion.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <section style={{ background: "var(--color-primary)", color: "var(--color-white)", borderRadius: "var(--radius-2xl)", padding: "var(--space-9) var(--space-8)", textAlign: "center", marginBottom: "var(--space-10)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--color-white)", marginBottom: "var(--space-6)" }}>
            Our Four Sustainability Commitments
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-6)", textAlign: "left" }}>
            <div>
              <strong style={{ fontSize: "var(--text-base)", color: "var(--color-secondary)", display: "block", marginBottom: "4px" }}>01. Zero Harsh Toxins</strong>
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.8)", margin: 0 }}>OEKO-TEX Standard certified dyes and closed-loop non-toxic washing.</p>
            </div>
            <div>
              <strong style={{ fontSize: "var(--text-base)", color: "var(--color-secondary)", display: "block", marginBottom: "4px" }}>02. Plastic-Free Packaging</strong>
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.8)", margin: 0 }}>100% home-compostable mailers and recycled kraft paper bands.</p>
            </div>
            <div>
              <strong style={{ fontSize: "var(--text-base)", color: "var(--color-secondary)", display: "block", marginBottom: "4px" }}>03. Fair Artisan Living</strong>
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.8)", margin: 0 }}>Safe working environments and livable wages across partner mills in India.</p>
            </div>
            <div>
              <strong style={{ fontSize: "var(--text-base)", color: "var(--color-secondary)", display: "block", marginBottom: "4px" }}>04. Circular Mindset</strong>
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.8)", margin: 0 }}>Designed for full biodegradability at the end of its natural lifecycle.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Button href="/shop" variant="primary" size="lg">
            Explore the Essentials Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
