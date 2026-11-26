'use client';

import React from 'react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'micro' | 'title' | 'card' | 'thumbnail';
}

export function Skeleton({
  className = '',
  variant = 'text',
}: SkeletonProps) {
  const shouldReduceMotion = useReducedMotion();

  const variantClasses = {
    text: 'h-4 w-full',
    micro: 'h-3 w-24',
    title: 'h-8 w-3/4',
    card: 'aspect-[4/5] w-full',
    thumbnail: 'w-16 h-16',
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-smoke/15 border border-line-soft ${variantClasses} ${
        shouldReduceMotion ? '' : 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent'
      } ${className}`}
    />
  );
}
