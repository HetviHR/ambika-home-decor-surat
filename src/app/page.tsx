import { Hero } from "@/components/hero";
import { FeaturedProductsSection } from "@/components/catalog/featured-products-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProductsSection />
      <CategoriesSection />
      <ContactSection />
    </>
  );
}
