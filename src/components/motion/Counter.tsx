'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;      // Seconds (default: 1.0s, clamped under 1.2s)
  locale?: string;        // Default: 'en-IN'
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 1.0,
  locale = 'en-IN',
  prefix = '',
  suffix = '',
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(from);

  // Format number respecting locale
  const format = (num: number) => {
    return `${prefix}${Math.round(num).toLocaleString(locale)}${suffix}`;
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(to);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    const clampedDuration = Math.min(duration, 1.2) * 1000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / clampedDuration, 1);
      
      // Editorial ease-out formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * easeProgress;

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setValue(to);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, to, from, duration, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className={className}>{format(to)}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
