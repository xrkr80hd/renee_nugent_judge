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
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/92 backdrop-blur-xl">
      <div className="container flex min-h-16 items-center justify-between gap-4 md:min-h-20">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-bold uppercase tracking-[0.11em] text-foreground/72 hover:text-foreground xl:text-sm"
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
            className="inline-flex size-11 items-center justify-center rounded-md border border-primary/20 bg-white text-primary shadow-sm transition-colors hover:bg-muted lg:hidden"
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
            className="inline-flex size-11 items-center justify-center rounded-md border border-primary/20 bg-white text-primary shadow-sm transition-colors hover:bg-muted lg:hidden"
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
        <div id="mobile-navigation" className="border-t border-primary/10 bg-background/98 shadow-lg lg:hidden">
          <nav className="container flex justify-center py-2" aria-label="Mobile navigation">
            <div className="grid w-full max-w-[18rem] grid-cols-2 gap-1 rounded-md border border-primary/10 bg-white p-2 shadow-sm">
              {mobileNav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-md px-2 py-2 text-center text-[0.7rem] font-bold uppercase tracking-[0.09em] text-foreground/78 transition-colors hover:bg-muted hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="container mx-auto grid max-w-[18rem] grid-cols-2 gap-2 pb-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/donate" onClick={() => setMenuOpen(false)}>
                Donate
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/volunteer" onClick={() => setMenuOpen(false)}>
                Volunteer
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
