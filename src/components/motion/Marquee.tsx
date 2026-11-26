'use client';

import React from 'react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;          // Duration in seconds for one full loop (default: 25)
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 25,
  pauseOnHover = true,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`group overflow-hidden flex select-none w-full relative ${className}`}
      aria-hidden={shouldReduceMotion ? undefined : 'true'}
    >
      <div
        className={`flex shrink-0 min-w-full items-center gap-8 ${
          shouldReduceMotion
            ? ''
            : reverse
            ? 'animate-marquee-reverse'
            : 'animate-marquee'
        } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: shouldReduceMotion ? 'paused' : undefined,
        }}
      >
        {children}
      </div>

      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className={`flex shrink-0 min-w-full items-center gap-8 ${
            reverse ? 'animate-marquee-reverse' : 'animate-marquee'
          } ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
