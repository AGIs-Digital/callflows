import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AboutSection } from "@/components/sections/about-section";

export default function AboutPage() {
  return (
    <main className="bg-background">
      <SiteHeader />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}


