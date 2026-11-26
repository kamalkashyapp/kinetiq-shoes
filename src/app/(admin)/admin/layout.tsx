'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Star,
  Settings,
  ArrowUpRight,
  LogOut,
  Moon,
  Sun,
  Shield,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const ADMIN_NAV = [
  { href: '/admin', label: 'OVERVIEW', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'ANALYTICS & FUNNEL', icon: BarChart3 },
  { href: '/admin/products', label: 'PRODUCTS & STOCK', icon: Package },
  { href: '/admin/orders', label: 'ORDERS & DISPATCH', icon: ShoppingBag },
  { href: '/admin/customers', label: 'CUSTOMERS', icon: Users },
  { href: '/admin/discounts', label: 'DISCOUNTS & CODES', icon: Tag },
  { href: '/admin/reviews', label: 'REVIEWS QUEUE', icon: Star },
  { href: '/admin/settings', label: 'STORE SETTINGS', icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Night studio dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminSignOut = () => {
    document.cookie = 'kinetiq-admin-session=; path=/; max-age=0';
    router.push('/auth/login');
  };

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'dark bg-ink text-paper' : 'bg-bone/40 text-ink'}`}>
      {/* Sidebar Rail */}
      <aside className="w-64 border-r border-line bg-paper flex flex-col justify-between shrink-0 sticky top-0 h-screen z-30">
        <div>
          {/* Logo / Header Lockup */}
          <div className="p-6 border-b border-line flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tighter text-ink">
                  KINETIQ
                </span>
                <span className="micro-label bg-clay text-paper px-1.5 py-0.5 text-[9px] font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] font-mono text-smoke uppercase tracking-wider mt-0.5">
                OPERATIONS SUITE v2.4
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Operational" />
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-ink text-paper font-bold shadow-sm'
                      : 'text-smoke hover:text-ink hover:bg-bone'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rail Footer */}
        <div className="p-4 border-t border-line space-y-3 bg-bone/30">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-smoke text-[10px]">OPERATOR</span>
            <span className="font-bold text-ink truncate max-w-[120px]">admin@kinetiq</span>
          </div>

          <div className="pt-2 border-t border-line/60 flex items-center justify-between">
            <Link
              href="/"
              className="text-[11px] font-mono uppercase text-smoke hover:text-ink flex items-center gap-1"
            >
              <span>STOREFRONT</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleAdminSignOut}
              className="text-[11px] font-mono uppercase text-clay hover:text-clay/80 font-bold flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>EXIT</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-line bg-paper px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-smoke uppercase tracking-wider hidden sm:inline">
              OPERATIONS DESK // IST {timeString || '12:00:00'}
            </span>
            <span className="hidden sm:inline text-line">|</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-bone border border-line font-mono text-[10px] text-ink uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              CASHFREE SANDBOX CONNECTED
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Night Studio Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 border border-line bg-bone hover:border-ink transition-colors text-ink"
              title={isDarkMode ? 'Switch to Bone Canvas' : 'Switch to Night Studio'}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-acid" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
