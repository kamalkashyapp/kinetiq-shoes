'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/providers/ToastProvider';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  if (pathname?.startsWith('/admin')) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: 'INVALID ENTRY',
        description: 'Please input an authentic email address.',
        type: 'warn',
      });
      return;
    }

    setSubscribed(true);
    toast({
      title: 'DISPATCH FREQUENCY CONFIRMED',
      description: 'You are now on the KINETIQ early drops registry.',
      type: 'success',
    });
  };

  return (
    <footer className="w-full bg-ink text-bone border-t border-ink-soft overflow-hidden relative">
      {/* Upper Newsletter & Dispatch Band */}
      <div className="max-w-page mx-auto px-4 md:px-10 pt-16 pb-12 border-b border-bone/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="micro-label text-acid">COMMUNIQUE // REGISTRY</span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mt-3 text-bone">
              EARLY ACCESS TO EXPERIMENTAL DROPS.
            </h3>
            <p className="text-xs md:text-sm text-smoke font-sans mt-3 max-w-lg">
              No promotions or marketing noise. Only prototype releases, run-matrix lab updates, and technical silhouettes.
            </p>
          </div>

          <div className="lg:col-span-5">
            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative border-b border-bone/30 focus-within:border-acid transition-colors pb-1 flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER WORK OR PERSONAL EMAIL"
                  disabled={subscribed}
                  className="w-full bg-transparent text-bone placeholder:text-smoke/60 text-xs md:text-sm font-mono uppercase tracking-wider focus:outline-none py-2 pr-10"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  aria-label="Subscribe to newsletter"
                  className="text-bone hover:text-acid transition-colors p-1"
                >
                  {subscribed ? (
                    <Check className="w-5 h-5 text-acid" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="micro-label text-smoke/50 mt-2 text-[9px]">
                BY SUBSCRIBING YOU AGREE TO OUR PRIVACY STANCE // ZERO THIRD-PARTY SHARING
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* 4 Editorial Navigation Columns */}
      <div className="max-w-page mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Collections */}
          <div className="space-y-4">
            <p className="micro-label text-smoke">COLLECTIONS</p>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/collections/terra" className="hover:text-acid transition-colors">
                  TERRA // ALL-TERRAIN
                </Link>
              </li>
              <li>
                <Link href="/collections/pulse" className="hover:text-acid transition-colors">
                  PULSE // ROAD RACING
                </Link>
              </li>
              <li>
                <Link href="/collections/form" className="hover:text-acid transition-colors">
                  FORM // ESSENTIAL
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-acid transition-colors">
                  VIEW FULL CATALOG [24]
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Engineering & Material Science */}
          <div className="space-y-4">
            <p className="micro-label text-smoke">ENGINEERING</p>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/about#lattice" className="hover:text-acid transition-colors">
                  K-LATTICE DAMPING
                </Link>
              </li>
              <li>
                <Link href="/about#materials" className="hover:text-acid transition-colors">
                  ZERO-RESIN CARBON
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-acid transition-colors">
                  ANATOMICAL SIZE GUIDE
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-acid transition-colors">
                  CIRCULAR RECOVERY
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Legal */}
          <div className="space-y-4">
            <p className="micro-label text-smoke">SUPPORT // LOGISTICS</p>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link href="/shipping-returns" className="hover:text-acid transition-colors">
                  SHIPPING & REVERSE PICKUP
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-acid transition-colors">
                  TECHNICAL FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-acid transition-colors">
                  CLIENT SERVICES DESK
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-acid transition-colors">
                  TERMS OF COMMERCE
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-acid transition-colors">
                  PRIVACY PROTOCOL
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & System Info */}
          <div className="space-y-4">
            <p className="micro-label text-smoke">SYSTEM DIRECTORY</p>
            <div className="text-xs font-mono space-y-2 text-smoke">
              <p>CURRENCY: INR (₹)</p>
              <p>PAYMENT: CASHFREE PG SANDBOX</p>
              <p>LOCALE: EN-IN // ASIA/KOLKATA</p>
              <p className="pt-2 text-bone">
                <Link href="/design" className="text-acid underline uppercase">
                  VIEW DESIGN SPEC (/DESIGN)
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cropped KINETIQ Wordmark at Bottom Edge */}
      <div className="w-full select-none pointer-events-none overflow-hidden flex justify-center -mb-2 md:-mb-4">
        <h1 className="font-display font-extrabold text-[10vw] leading-none tracking-tight text-bone/10 whitespace-nowrap">
          KINETIQ
        </h1>
      </div>

      {/* Baseline Micro-bar */}
      <div className="border-t border-bone/10 bg-black/40 py-4 px-4 md:px-10">
        <div className="max-w-page mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-smoke">
          <span className="micro-label text-[10px]">
            © {new Date().getFullYear()} KINETIQ ATHLETIC LABS. WEIGHTLESS BY DESIGN. ALL RIGHTS RESERVED.
          </span>
          <span className="micro-label text-[10px] text-bone/60">
            PRODUCED WITHOUT ARTIFICIAL COMPONENT LIBRARIES // PURE NEXT.JS APP ROUTER
          </span>
        </div>
      </div>
    </footer>
  );
}
