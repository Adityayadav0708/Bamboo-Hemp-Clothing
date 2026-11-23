import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Terms and Conditions – Bamboo & Hemp Everyday Essentials",
  description: "Terms of service, website usage agreement, pricing rules, and intellectual property terms. [Placeholder]",
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout title="Terms and Conditions" lastUpdated="November 2024">
      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or purchasing from our platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all terms, you may not access or use our services.
      </p>

      <h2>2. Product Representations &amp; Pricing</h2>
      <p>
        We make every reasonable effort to display product dimensions, natural colors, and fabric characteristics as accurately as possible. Because bamboo and hemp are organic fibers, minor natural variations in texture and dye absorption may occur. All prices listed are in Indian Rupees (INR) and are inclusive of applicable GST taxes.
      </p>

      <h2>3. Accounts and Passwords</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for restricting access to your computer or mobile device. You agree to accept responsibility for all activities occurring under your account.
      </p>

      <h2>4. Orders &amp; Cancellation Rights</h2>
      <p>
        We reserve the right to refuse or cancel any order for reasons including product unavailability, inaccuracies in product descriptions or pricing, or suspected unauthorized or fraudulent transactions.
      </p>

      <h2>5. Intellectual Property Rights</h2>
      <p>
        All content on this website—including brand text, graphics, logos, images, icons, and software code—is the property of the company and is protected under Indian and international copyright and trademark laws.
      </p>

      <h2>6. Governing Jurisdiction</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws of India, and any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
      </p>
    </PolicyLayout>
  );
}
