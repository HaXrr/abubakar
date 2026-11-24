import ClientsHoverGrid from "@/components/ClientsHoverGrid";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import ProductsGrid from "@/components/ProductsGrid";
import QuoteSection from "@/components/QuoteSection";
import ServicesGrid from "@/components/ServicesGrid";
import StickyProjectCards from "@/components/StickyProjectCards";
import Testimonials from "@/components/Testimonials";

export default function Page() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesGrid />
      <QuoteSection />
      <ProductsGrid />
      <StickyProjectCards />
      <ClientsHoverGrid />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </>
  );
}
