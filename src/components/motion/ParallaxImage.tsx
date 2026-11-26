'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;       // Magnitude of Y travel in pixels (default: 32)
  scaleDelta?: number;  // Scale zoom magnitude (default: 0.05)
  className?: string;
  containerClassName?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 32,
  scaleDelta = 0.05,
  className = '',
  containerClassName = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Clamped transform values — hardware-accelerated transform only
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + scaleDelta, 1]);

  if (shouldReduceMotion) {
    return (
      <div className={`overflow-hidden relative ${containerClassName}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${containerClassName}`}>
      <motion.div
        style={{ y, scale }}
        className="w-full h-full will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
        />
      </motion.div>
    </div>
  );
}
