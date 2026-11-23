import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Privacy Policy – Bamboo & Hemp Everyday Essentials",
  description: "Learn how we handle your personal data, transaction details, and cookie consent in accordance with Indian IT laws. [Placeholder]",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="November 2024">
      <h2>1. Information We Collect</h2>
      <p>
        When you browse our storefront, register an account, or complete an order, we collect information necessary to fulfill our services:
      </p>
      <ul>
        <li><strong>Personal identifiers:</strong> Name, shipping address, email address, and phone number.</li>
        <li><strong>Account credentials:</strong> Password hashes (stored with salted cryptographic encryption).</li>
        <li><strong>Transaction data:</strong> Order history and delivery preferences. We do not store raw credit card numbers or banking passwords on our servers.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Processing and delivering your orders.</li>
        <li>Sending delivery status updates via SMS and email.</li>
        <li>Providing dedicated customer care and warranty support.</li>
        <li>Improving website usability, responsiveness, and performance.</li>
      </ul>

      <h2>3. Payment Security &amp; Data Sharing</h2>
      <p>
        All digital payment transactions are conducted through secure, PCI-DSS compliant payment gateways utilizing 256-bit SSL encryption. We do not sell or rent your personal data to third-party marketing companies.
      </p>

      <h2>4. Cookies &amp; Local Storage</h2>
      <p>
        We utilize browser cookies and local storage exclusively for essential e-commerce functions such as maintaining your active shopping cart contents and persistent user login sessions.
      </p>

      <h2>5. Your Rights &amp; Data Deletion</h2>
      <p>
        You have the right to request a copy of your stored personal details or request deletion of your account by emailing privacy@bamboo-hemp-placeholder.com.
      </p>
    </PolicyLayout>
  );
}
