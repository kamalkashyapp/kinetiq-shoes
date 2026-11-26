import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Search, Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-10 py-16">
      <div className="max-w-2xl w-full border border-line bg-paper p-8 sm:p-12 text-center space-y-8">
        <div className="flex items-center justify-center gap-3">
          <Badge variant="acid">ERROR // 404</Badge>
          <span className="micro-label text-smoke">VECTOR DRIFT DETECTED</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display font-black text-6xl sm:text-8xl tracking-tighter uppercase leading-[0.9]">
            404
            <br />
            <span className="text-smoke">OUT OF BOUNDS.</span>
          </h1>
          <p className="font-mono text-xs sm:text-sm text-smoke max-w-md mx-auto leading-relaxed">
            The requested technical coordinates do not exist in the KINETIQ registry. The route may have been relocated or archived.
          </p>
        </div>

        {/* Quick Links */}
        <div className="pt-4 border-t border-line space-y-3">
          <span className="micro-label text-smoke block">// RECOMMENDED RE-ROUTING</span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm" className="bg-ink text-bone hover:bg-ink/90 font-mono text-xs">
              <Link href="/">
                <Home className="w-3.5 h-3.5 mr-1.5" /> STOREFRONT HOME
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link href="/shop">
                EXPLORE ALL SILHOUETTES <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-mono text-xs">
              <Link href="/search">
                <Search className="w-3.5 h-3.5 mr-1.5" /> SEARCH ARCHIVE
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
