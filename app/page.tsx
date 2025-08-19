import { Suspense } from "react";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { SiteFooter } from "@/components/site-footer";
import { Skeleton } from "@/components/ui/skeleton";

// Above the fold - sofort laden
import { IntegrationChallengesSection } from "@/components/sections/integration-challenges-section";
import { PetraUSPSection } from "@/components/sections/petra-usp-section";

// Below the fold - lazy laden für bessere Performance
const ProcessSection = dynamic(() => import("@/components/sections/process-section").then(mod => ({ default: mod.ProcessSection })), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});

const PricingComparisonSection = dynamic(() => import("@/components/sections/pricing-comparison-section").then(mod => ({ default: mod.PricingComparisonSection })), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});

const CoreFeaturesSection = dynamic(() => import("@/components/sections/core-features-section").then(mod => ({ default: mod.CoreFeaturesSection })), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});

const FeaturesSection = dynamic(() => import("@/components/sections/features-section").then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});

const CTASection = dynamic(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CTASection })), {
  loading: () => <Skeleton className="h-32 w-full" />,
  ssr: false,
});

const CTASectionSecondary = dynamic(() => import("@/components/sections/cta-section-secondary").then(mod => ({ default: mod.CTASectionSecondary })), {
  loading: () => <Skeleton className="h-32 w-full" />,
  ssr: false,
});

const ROICalculator = dynamic(() => import("@/components/pricing/roi-calculator").then(mod => ({ default: mod.ROICalculator })), {
  loading: () => <Skeleton className="h-64 w-full" />,
  ssr: false,
});

export default function Home() {
  return (
    <div className="bg-background">
      <SiteHeader />
      <main 
        id="main-content" 
        className="focus:outline-none"
        role="main"
        aria-label="Hauptinhalt"
        tabIndex={-1}
      >
        <HeroSection />
        <IntegrationChallengesSection />
        <PetraUSPSection />
        
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <ProcessSection />
        </Suspense>
        
        <section id="pricecomparison" aria-labelledby="pricing-heading">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <PricingComparisonSection />
          </Suspense>
        </section>
        
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <CTASection />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <ROICalculator />
        </Suspense>
        
        <section id="features" aria-labelledby="features-heading">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <FeaturesSection />
          </Suspense>
        </section>
        
        <section id="core-features" aria-labelledby="core-features-heading">
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <CoreFeaturesSection />
          </Suspense>
        </section>
        
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <CTASectionSecondary />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}