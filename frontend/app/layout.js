import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Bamboo & Hemp Everyday Essentials | Sustainable Clothing",
    template: "%s | Bamboo & Hemp",
  },
  description:
    "Discover premium everyday clothing made from bamboo and hemp fabrics. Soft, sustainable, and kind to the planet. [Placeholder – company to provide final copy.]",
  keywords: ["bamboo clothing", "hemp clothing", "sustainable fashion", "eco-friendly", "innerwear", "t-shirts"],
  authors: [{ name: "[Brand Name Placeholder]" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Bamboo & Hemp Everyday Essentials",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {/* Skip to main content — accessibility */}
            <a href="#main-content" className="sr-only" style={{ position:"absolute", top:0, left:0, zIndex:9999, padding:"0.5rem 1rem", background:"var(--color-primary)", color:"#fff", borderRadius:"0 0 8px 0" }}>
              Skip to main content
            </a>

            <AnnouncementBar />
            <Navbar />

            <main id="main-content" style={{ minHeight: "60vh" }}>
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
