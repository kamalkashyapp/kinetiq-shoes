'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  Shield,
  LogOut,
  ArrowUpRight,
  LayoutDashboard,
} from 'lucide-react';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const NAV_TABS = [
  { href: '/account', label: 'OVERVIEW', icon: LayoutDashboard },
  { href: '/account/orders', label: 'ORDER HISTORY', icon: Package },
  { href: '/account/addresses', label: 'SAVED ADDRESSES', icon: MapPin },
  { href: '/account/wishlist', label: 'WISHLIST', icon: Heart },
  { href: '/account/settings', label: 'PREFERENCES & SECURITY', icon: Settings },
];

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const { user, role, signOut } = useAuth();

  const userEmail = user?.email || 'customer@kinetiq.design';
  const userName = (user?.user_metadata?.full_name as string) || userEmail.split('@')[0];
  const userRole = role || 'customer';

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Account Top Header Banner */}
      <div className="border border-line bg-paper p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="micro-label bg-bone px-2 py-0.5 border border-line">
              CLIENT REGISTRY
            </span>
            <span className={`micro-label px-2 py-0.5 border ${
              userRole === 'admin' ? 'border-clay text-paper bg-clay' : 'border-acid text-ink bg-acid/20'
            }`}>
              ROLE: {userRole.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-ink">
            {userName}
          </h1>

          <p className="font-mono text-xs text-smoke mt-1">
            ACCOUNT ID: {userEmail} · STATUS: VERIFIED
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {userRole === 'admin' && (
            <Link href="/admin">
              <Button variant="clay" size="sm" className="font-bold">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                ADMIN COMMAND CENTER
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          )}

          <Button variant="secondary" size="sm" onClick={() => signOut()}>
            <LogOut className="w-3.5 h-3.5 mr-1.5" />
            SIGN OUT
          </Button>
        </div>
      </div>

      {/* Editorial Sub-Navigation Tabs */}
      <nav className="border-b border-line flex overflow-x-auto gap-1 sm:gap-2 scrollbar-none">
        {NAV_TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors ${
                isActive
                  ? 'border-ink text-ink font-bold bg-bone/40'
                  : 'border-transparent text-smoke hover:text-ink hover:border-line'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Tab Page Surface */}
      <div>{children}</div>
    </div>
  );
}
