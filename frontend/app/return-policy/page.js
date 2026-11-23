import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Return & Exchange Policy – Bamboo & Hemp Everyday Essentials",
  description: "Review our 15-day return and exchange guidelines for sustainable outerwear and innerwear hygiene conditions. [Placeholder]",
};

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Return & Exchange Policy" lastUpdated="November 2024">
      <h2>1. 15-Day Hassle-Free Window</h2>
      <p>
        We want you to love your sustainable clothing. If you are not completely satisfied with your purchase, you may initiate a return or size exchange request within 15 days of the confirmed delivery date.
      </p>

      <h2>2. Eligibility Criteria</h2>
      <p>To be eligible for a full refund or exchange, items must meet the following conditions:</p>
      <ul>
        <li>Outerwear T-shirts must be unworn, unwashed, and odor-free.</li>
        <li>Original brand tags and compostable packaging must be intact.</li>
        <li>Proof of purchase (Order ID or invoice) must be provided.</li>
      </ul>

      <h2>3. Hygiene Exceptions (Innerwear)</h2>
      <p>
        Due to strict statutory hygiene and sanitation standards in India, <strong>men&apos;s and women&apos;s innerwear (briefs, boxers, trunks, hipster packs) are strictly non-returnable and non-exchangeable</strong> once the sealed product packaging has been opened, unless an undisputed manufacturing defect is proven upon arrival.
      </p>

      <h2>4. Return Pick-Up &amp; Processing</h2>
      <p>
        Our logistics partner will attempt reverse pick-up within 2-3 business days of return approval. Once the returned item is received at our hub and passes standard quality inspection, refunds are processed to your original payment method within 5 to 7 business days.
      </p>

      <h2>5. Reverse Shipping Charges</h2>
      <p>
        Size exchanges for defective or wrong shipments are 100% complimentary. For elective returns, a reverse logistics fee of ₹75 may be deducted from the final refund amount.
      </p>
    </PolicyLayout>
  );
}
