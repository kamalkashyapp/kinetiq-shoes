'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, User, Menu, X, ArrowUpRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { SearchPalette } from './SearchPalette';

export function Header() {
  const pathname = usePathname();
  const { toggleCart, itemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsHovered, setCollectionsHovered] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut listener (Must be before any early return)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const count = itemCount();

  // Hide storefront header on admin desk
  if (pathname?.startsWith('/admin')) return null;

  const collections = [
    {
      slug: 'terra',
      name: 'TERRA',
      subtitle: 'Trail / All-Terrain',
      desc: 'Rugged lugged outsole, earth tones, clay accents.',
      href: '/collections/terra',
      accentColor: '#B4553A',
    },
    {
      slug: 'pulse',
      name: 'PULSE',
      subtitle: 'Performance Running',
      desc: 'Technical engineered mesh, featherweight lattice, acid accents.',
      href: '/collections/pulse',
      accentColor: '#D9FF43',
    },
    {
      slug: 'form',
      name: 'FORM',
      subtitle: 'Lifestyle / Minimal',
      desc: 'Monochrome geometry, buttery calfskin suede, everyday architecture.',
      href: '/collections/form',
      accentColor: '#8A867E',
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-bone/90 backdrop-blur-md border-b border-line transition-colors">
        {/* Top Ticker / Eyebrow */}
        <div className="bg-ink text-bone px-4 py-1.5 text-center flex items-center justify-between border-b border-ink">
          <div className="hidden md:flex items-center gap-4">
            <span className="micro-label text-[10px] text-smoke">EDITION: AUTUMN/WINTER 2026</span>
            <span className="text-[10px] font-mono text-smoke">//</span>
            <span className="micro-label text-[10px] text-acid">COMPLIMENTARY DOMESTIC DISPATCH ON ALL ORDERS</span>
          </div>
          <div className="w-full md:w-auto text-center">
            <span className="micro-label text-[10px] tracking-[0.2em] text-bone">
              KINETIQ LABS // WEIGHTLESS BY DESIGN
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="micro-label text-[10px] text-smoke">CURRENCY: INR (₹)</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-page mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            <div
              className="relative"
              onMouseEnter={() => setCollectionsHovered(true)}
              onMouseLeave={() => setCollectionsHovered(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-2 micro-label text-ink hover:text-smoke transition-colors focus-visible:outline-none"
              >
                <span>COLLECTIONS</span>
                <span className="text-[9px] text-smoke font-mono">[3]</span>
              </button>

              {/* Mega-menu dropdown */}
              {collectionsHovered && (
                <div className="absolute top-full left-0 w-[580px] bg-paper border border-line shadow-pop p-6 grid grid-cols-3 gap-6 animate-in fade-in-50 zoom-in-95 duration-fast">
                  {collections.map((col) => (
                    <Link
                      key={col.slug}
                      href={col.href}
                      className="group block p-3 border border-line-soft hover:border-ink transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display font-bold text-lg text-ink group-hover:text-ink">
                          {col.name}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-smoke group-hover:text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="micro-label text-smoke text-[9px] leading-tight mb-2">
                        {col.subtitle}
                      </p>
                      <p className="text-xs text-ink/70 leading-snug line-clamp-2">
                        {col.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/shop"
              className="micro-label text-ink hover:text-smoke transition-colors"
            >
              CATALOG
            </Link>

            <Link
              href="/about"
              className="micro-label text-ink hover:text-smoke transition-colors"
            >
              LAB // ABOUT
            </Link>

            <Link
              href="/design"
              className="micro-label text-acid bg-ink px-2 py-0.5 rounded-hair hover:bg-ink-soft transition-colors"
            >
              DEV: /DESIGN
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="lg:hidden p-2 text-ink hover:text-smoke"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Center Brand Wordmark */}
          <Link href="/" className="group flex flex-col items-center">
            <span className="font-display text-2xl md:text-3xl font-extrabold tracking-[-0.04em] text-ink group-hover:opacity-80 transition-opacity">
              KINETIQ
            </span>
            <span className="hidden md:block micro-label text-[8px] text-smoke tracking-[0.25em] -mt-1">
              ATHLETIC ARCHITECTURE
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search catalog (Cmd+K)"
              className="p-2 text-ink hover:text-smoke transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
              <span className="hidden xl:inline micro-label text-[10px] text-smoke border border-line px-1.5 py-0.5">
                ⌘K
              </span>
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              aria-label="Customer account"
              className="p-2 text-ink hover:text-smoke transition-colors"
            >
              <User className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={toggleCart}
              aria-label="Open cart"
              className="p-2 text-ink hover:text-smoke transition-colors flex items-center gap-1.5 relative"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
              {count > 0 && (
                <span className="bg-acid text-ink font-mono font-bold text-[10px] h-4 min-w-4 px-1 rounded-full flex items-center justify-center -ml-1">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-bone flex flex-col lg:hidden animate-in fade-in duration-base"
        >
          <div className="p-4 flex items-center justify-between border-b border-line">
            <span className="font-display text-xl font-bold tracking-tight">KINETIQ</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 text-ink"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="micro-label text-smoke">COLLECTIONS</p>
              <div className="space-y-3">
                {collections.map((col) => (
                  <Link
                    key={col.slug}
                    href={col.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-4 border border-line bg-paper"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl font-bold">{col.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-smoke" />
                    </div>
                    <span className="micro-label text-smoke">{col.subtitle}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-line space-y-4">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-display text-2xl font-bold hover:text-smoke"
                >
                  ALL SNEAKERS
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-display text-2xl font-bold hover:text-smoke"
                >
                  ABOUT / LAB
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-display text-2xl font-bold hover:text-smoke"
                >
                  MY ACCOUNT
                </Link>
                <Link
                  href="/design"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-mono text-sm text-acid bg-ink p-3 text-center"
                >
                  VIEW DESIGN TOKENS (/DESIGN)
                </Link>
              </div>
            </div>

            <div className="pt-8 border-t border-line">
              <p className="micro-label text-smoke">KINETIQ HQ // MUMBAI, INDIA</p>
              <p className="text-xs text-smoke mt-1 font-mono">SUPPORT@KINETIQ-LABS.COM</p>
            </div>
          </div>
        </div>
      )}

      {/* Global ⌘K Instant Search Palette */}
      <SearchPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
