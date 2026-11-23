import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Shipping & Delivery Policy – Bamboo & Hemp Everyday Essentials",
  description: "Learn about our shipping timelines, domestic courier partners, and free delivery thresholds across India. [Placeholder]",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping & Delivery Policy" lastUpdated="November 2024">
      <h2>1. Domestic Shipping Coverage</h2>
      <p>
        We ship across all serviceable pincodes in India via accredited logistics partners (including Delhivery, BlueDart, and India Post Speed Post). All shipments originate from our central fulfillment center in Bengaluru, Karnataka.
      </p>

      <h2>2. Shipping Rates &amp; Free Delivery</h2>
      <ul>
        <li><strong>Orders above ₹999:</strong> Free Standard Domestic Delivery.</li>
        <li><strong>Orders below ₹999:</strong> A flat delivery fee of ₹99 is applicable at checkout.</li>
        <li><strong>Express Delivery:</strong> Available in select metropolitan zones for a flat fee of ₹149.</li>
      </ul>

      <h2>3. Estimated Delivery Timelines</h2>
      <p>
        Orders are typically packed and dispatched within 24 to 48 hours of confirmation (excluding Sundays and national holidays). Typical in-transit delivery windows are:
      </p>
      <ul>
        <li><strong>Metropolitan Cities (Tier 1):</strong> 2 to 4 business days.</li>
        <li><strong>Rest of India (Tier 2 &amp; 3):</strong> 4 to 7 business days.</li>
        <li><strong>Special Regions (North East, J&amp;K, Islands):</strong> 7 to 10 business days.</li>
      </ul>

      <h2>4. Order Tracking</h2>
      <p>
        Once your package leaves our fulfillment center, a tracking ID and link will be automatically generated and sent via email and SMS. You can also monitor your order status directly from your customer account dashboard.
      </p>

      <h2>5. Damaged or Tampered Shipments</h2>
      <p>
        If your biodegradable delivery mailer appears visibly opened, cut, or damaged at the time of delivery, please do not accept the package and notify customer support immediately.
      </p>
    </PolicyLayout>
  );
}
