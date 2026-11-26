'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Package, MapPin, Heart, Shield, LogOut, ArrowUpRight } from 'lucide-react';

export default function AccountOverviewPage() {
  const { user, role, signOut, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-page mx-auto px-4 md:px-10 py-16 text-center">
        <p className="micro-label text-smoke">HYDRATING CLIENT IDENTIFIER...</p>
      </div>
    );
  }

  const userEmail = user?.email || 'guest@kinetiq-labs.com';
  const userName = (user?.user_metadata?.full_name as string) || userEmail.split('@')[0];
  const userRole = role || 'customer';

  return (
    <div className="max-w-page mx-auto px-4 md:px-10 py-12 md:py-16 space-y-12">
      {/* Overview Header */}
      <div className="border-b border-line pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="acid">CLIENT DASHBOARD</Badge>
            <Badge variant={userRole === 'admin' ? 'clay' : 'outline'}>
              ROLE: {userRole.toUpperCase()}
            </Badge>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            WELCOME, {userName}
          </h1>
          <p className="text-xs font-mono text-smoke mt-1">
            IDENTIFIER: {userEmail} // STATUS: ACTIVE REGISTRY
          </p>
        </div>

        <div className="flex items-center gap-3">
          {userRole === 'admin' && (
            <Link href="/admin">
              <Button variant="clay" size="sm">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                ENTER ADMIN PANEL
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

      {/* Account Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tile 1: Orders */}
        <Link
          href="/account/orders"
          className="group p-6 border border-line bg-paper hover:border-ink transition-colors shadow-sm space-y-4"
        >
          <div className="w-10 h-10 border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-bone transition-colors">
            <Package className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">ORDER HISTORY</h3>
            <p className="text-xs text-smoke font-mono mt-1">TRACK DISPATCHES & INVOICES</p>
          </div>
          <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs font-mono">
            <span>VIEW RECENT</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-smoke group-hover:text-ink" />
          </div>
        </Link>

        {/* Tile 2: Addresses */}
        <Link
          href="/account/addresses"
          className="group p-6 border border-line bg-paper hover:border-ink transition-colors shadow-sm space-y-4"
        >
          <div className="w-10 h-10 border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-bone transition-colors">
            <MapPin className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">SAVED ADDRESSES</h3>
            <p className="text-xs text-smoke font-mono mt-1">DOMESTIC DISPATCH DESTINATIONS</p>
          </div>
          <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs font-mono">
            <span>MANAGE LOCATIONS</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-smoke group-hover:text-ink" />
          </div>
        </Link>

        {/* Tile 3: Wishlist */}
        <Link
          href="/account/wishlist"
          className="group p-6 border border-line bg-paper hover:border-ink transition-colors shadow-sm space-y-4"
        >
          <div className="w-10 h-10 border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-bone transition-colors">
            <Heart className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">RESERVED WISHLIST</h3>
            <p className="text-xs text-smoke font-mono mt-1">SAVED RUN MATRIX SILHOUETTES</p>
          </div>
          <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs font-mono">
            <span>VIEW SAVED</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-smoke group-hover:text-ink" />
          </div>
        </Link>

        {/* Tile 4: Settings & Sizing */}
        <Link
          href="/account/settings"
          className="group p-6 border border-line bg-paper hover:border-ink transition-colors shadow-sm space-y-4"
        >
          <div className="w-10 h-10 border border-line flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-bone transition-colors">
            <User className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl">FIT PREFERENCES</h3>
            <p className="text-xs text-smoke font-mono mt-1">US 10.0 // SECURITY & PROFILE</p>
          </div>
          <div className="pt-4 border-t border-line-soft flex items-center justify-between text-xs font-mono">
            <span>EDIT PROFILE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-smoke group-hover:text-ink" />
          </div>
        </Link>
      </div>

      {/* Database Profile Ledger Record */}
      <div className="p-6 border border-line bg-paper space-y-4">
        <div className="flex justify-between items-center border-b border-line pb-3">
          <span className="micro-label text-smoke">DATABASE PROFILE RECORD</span>
          <span className="micro-label text-status-success font-bold">● RLS SECURED (AUTH.UID())</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div>
            <span className="text-smoke block text-[10px]">RECORD ID (UUID)</span>
            <span className="text-ink break-all">{user?.id || 'LOCAL-DEV-SESSION'}</span>
          </div>
          <div>
            <span className="text-smoke block text-[10px]">AUTH PROVIDER</span>
            <span className="text-ink uppercase">{user?.app_metadata?.provider || 'GOOGLE / EMAIL'}</span>
          </div>
          <div>
            <span className="text-smoke block text-[10px]">ROLE PRIVILEGE</span>
            <span className="text-ink font-bold uppercase">{userRole}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
