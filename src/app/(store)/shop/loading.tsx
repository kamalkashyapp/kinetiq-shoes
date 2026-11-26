import React from 'react';
import { Skeleton } from '@/components/motion/Skeleton';

export default function ShopLoading() {
  return (
    <div className="max-w-page mx-auto px-4 md:px-10 py-10 md:py-16 space-y-8">
      {/* Header Skeleton */}
      <div className="border-b border-line pb-6 space-y-2">
        <Skeleton variant="micro" className="w-32" />
        <Skeleton variant="title" className="w-64 h-12" />
      </div>

      <div className="flex gap-8">
        {/* Left Rail Skeleton */}
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <Skeleton variant="micro" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="micro" />
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </div>

        {/* Grid Skeletons */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-line bg-paper p-3 space-y-3">
              <Skeleton variant="card" />
              <Skeleton variant="title" className="h-6 w-3/4" />
              <Skeleton variant="micro" className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
