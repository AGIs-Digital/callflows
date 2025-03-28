"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-foreground/60"
        )}
      >
        Home
      </Link>
      <Link
        href="/pricing"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/pricing" ? "text-primary" : "text-foreground/60"
        )}
      >
        Preise
      </Link>
      <Link
        href="/blog"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname.startsWith("/blog") ? "text-primary" : "text-foreground/60"
        )}
      >
        Blog
      </Link>
      <Link
        href="/#about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/#about" ? "text-primary" : "text-foreground/60"
        )}
      >
        Über uns
      </Link>
      <Link
        href="/kontakt"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/kontakt" ? "text-primary" : "text-foreground/60"
        )}
      >
        Kontakt
      </Link>
    </nav>
  );
} 