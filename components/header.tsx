"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const nav = [
  ["About", "/about"],
  ["Qualifications", "/qualifications"],
  ["Philosophy", "/judicial-philosophy"],
  ["Events", "/events"],
  ["Volunteer", "/volunteer"],
  ["Contact", "/contact"]
] as const;

const mobileNav = nav.filter(([, href]) => href !== "/volunteer");

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-secondary/30 bg-white/96 shadow-sm backdrop-blur-xl">
      <div className="h-1 bg-primary" aria-hidden="true" />
      <div className="container flex min-h-16 items-center justify-between gap-3 md:min-h-[76px]">
        <Logo />
        <nav className="hidden items-center gap-1 rounded-full border border-primary/10 bg-background/70 p-1 shadow-sm lg:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.09em] text-foreground/72 transition-colors hover:bg-primary hover:text-white xl:px-4"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="outline" className="hidden md:inline-flex">
            <Link href="/donate">Donate</Link>
          </Button>
          <Button asChild>
            <Link href="/volunteer">Volunteer</Link>
          </Button>
        </div>
        {menuOpen ? (
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-secondary/45 bg-primary text-white shadow-sm transition-colors hover:bg-primary/92 lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded="true"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-secondary/45 bg-primary text-white shadow-sm transition-colors hover:bg-primary/92 lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded="false"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
      {menuOpen ? (
        <div id="mobile-navigation" className="border-t border-secondary/50 bg-[#d8ecf7]/95 shadow-judicial backdrop-blur-xl lg:hidden">
          <div className="container py-5">
            <nav className="mx-auto flex max-w-xs flex-col items-center gap-2" aria-label="Mobile navigation">
              {mobileNav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="w-full rounded-md border border-primary/15 bg-white/55 px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.12em] text-primary shadow-sm transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mx-auto mt-4 flex max-w-xs flex-col gap-2">
              <Button asChild variant="secondary">
                <Link href="/volunteer" onClick={() => setMenuOpen(false)}>
                  Volunteer
                </Link>
              </Button>
              <Button asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/donate" onClick={() => setMenuOpen(false)}>
                  Donate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
