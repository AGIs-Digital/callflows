"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { ZohoEmbed } from "@/components/booking/zoho-embed";
import { useI18n } from "@/lib/i18n";
import { useAuthStore } from "@/lib/auth/auth-store";
import { Button } from "@/components/ui/button";
import { LogOut, User, BarChart3 } from "lucide-react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useI18n();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
      isScrolled ? "shadow-sm" : ""
    )}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2" title="Zur callflows Startseite - KI-Telefonie & Voice Agents">
          <Image
            src="/images/callflows_brand_no_claim.png"
            alt="callflows Logo"
            title="callflows - KI-gestützte Voice Agents für automatisierte Telefonie"
            width={150}
            height={40}
            className="dark:invert"
            priority
          />
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <LanguageSelector />
            <ThemeToggle />
            <ZohoEmbed 
              buttonText={t('nav.consultation')}
              className="hidden md:flex"
              variant="outline"
              size="sm"
            />
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.name} ({user?.role})
                </span>
                
                {/* Dashboard Button für Admins */}
                {user?.role === 'admin' && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hidden md:flex"
                  >
                    <Link href="/seo-dashboard">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </Button>
                )}
                
                {/* Dashboard Button für Kunden */}
                {user?.role === 'customer' && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hidden md:flex"
                  >
                    <Link href="/customer-dashboard">
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="hidden md:flex"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden md:flex"
              >
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Anmelden
                </Link>
              </Button>
            )}
          </nav>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}