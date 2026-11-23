import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ShopByCategory from "@/components/ShopByCategory";
import BestsellerSection from "@/components/BestsellerSection";
import FabricBenefits from "@/components/FabricBenefits";
import CoolingBundles from "@/components/CoolingBundles";
import BrandStory from "@/components/BrandStory";
import FeaturedCollection from "@/components/FeaturedCollection";
import Testimonials from "@/components/Testimonials";
import NewsletterSection from "@/components/NewsletterSection";

export const metadata = {
  title: "Bamboo & Hemp Everyday Essentials | Sustainable Clothing India",
  description:
    "Shop premium bamboo and hemp everyday clothing — T-shirts, innerwear, and more. Soft, breathable, sustainable. Free shipping on orders above ₹999.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ShopByCategory />
      <BestsellerSection />
      <FabricBenefits />
      <CoolingBundles />
      <BrandStory />
      <FeaturedCollection />
      <Testimonials />
      <NewsletterSection />
    </>
  );
}
