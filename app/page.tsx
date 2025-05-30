import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PricingComparisonSection } from "@/components/sections/pricing-comparison-section";
import { ProductPreviewSection } from "@/components/sections/product-preview-section";
import { CoreFeaturesSection } from "@/components/sections/core-features-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";
import { CTASection } from "@/components/sections/cta-section";
import { CTASectionSecondary } from "@/components/sections/cta-section-secondary";
import { IntegrationChallengesSection } from "@/components/sections/integration-challenges-section";

export default function Home() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <HeroSection />
      <div className="bg-section-light">
        <ProcessSection />
      </div>
      <IntegrationChallengesSection />
      <div id="about">
        <AboutSection />
      </div>
      <div id="pricecomparison">
        <PricingComparisonSection />
      </div>
      <CTASection />
      <div id="core-features">
        <CoreFeaturesSection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div className="bg-section-dark">
        <ProductPreviewSection />
      </div>
      <CTASectionSecondary />
      <SiteFooter />
    </main>
  );
}