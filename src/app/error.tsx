'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RotateCcw, AlertTriangle, Home, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, log digest to telemetry
    console.error('Unhandled KINETIQ runtime exception:', error);
  }, [error]);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 py-16">
      <div className="max-w-2xl w-full border border-line bg-paper p-8 sm:p-12 text-center space-y-8">
        <div className="flex items-center justify-center gap-3">
          <Badge variant="clay">SYSTEM FAULT // 500</Badge>
          <span className="micro-label text-smoke">RUNTIME EXCEPTION</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display font-black text-5xl sm:text-7xl tracking-tighter uppercase leading-[0.9]">
            TELEMETRY
            <br />
            <span className="text-smoke">INTERRUPTED.</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-smoke max-w-md mx-auto leading-relaxed">
            A state or hydration anomaly occurred during server execution. The error digest has been captured for diagnostics.
          </p>
          {error.digest && (
            <div className="inline-block px-3 py-1 bg-bone border border-line font-mono text-[11px] text-smoke">
              DIGEST: {error.digest}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-line space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={() => reset()}
              size="sm"
              className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> RETRY RENDERING
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link href="/">
                <Home className="w-3.5 h-3.5 mr-1.5" /> RETURN HOME
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-mono text-xs">
              <Link href="/contact">
                <Mail className="w-3.5 h-3.5 mr-1.5" /> CONTACT CONCIERGE
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
