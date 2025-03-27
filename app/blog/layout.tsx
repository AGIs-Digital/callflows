import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { metadata } from "./metadata";

export { metadata };

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
} 