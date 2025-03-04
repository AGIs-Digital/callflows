import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PricingComparisonSection } from "@/components/sections/pricing-comparison-section";
import { ProductPreviewSection } from "@/components/sections/product-preview-section";
import { CoreFeaturesSection } from "@/components/sections/core-features-section";
import { UseCaseVideoSection } from "@/components/sections/use-case-video-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { CTASection } from "@/components/cta-section";
import { PricingFAQSection } from "@/components/sections/pricing-faq-section";

export default function Home() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <HeroSection />
      <div className="bg-section-light">
        <ProcessSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <CoreFeaturesSection />
      <PricingComparisonSection />
      <div className="bg-section-dark">
        <ProductPreviewSection />
      </div>
{/*       <div id="testimonials">
        <TestimonialsSection />
      </div> */}
      <div className="bg-section-light">
        <UseCaseVideoSection />
      </div>
        <div id="faq">
        <PricingFAQSection />
      </div>
      <CTASection />
      <SiteFooter />
    </main>
  );
}