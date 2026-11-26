'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const fullPath = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    if (fullPath !== lastTrackedPath.current) {
      lastTrackedPath.current = fullPath;
      trackPageView(fullPath);
    }
  }, [pathname, searchParams]);

  return null;
}
