'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';
import { durations, easings } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  distance = 16,
  scale = 0.98,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: distance,
        scale,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: durations.slow,
        delay,
        ease: easings.out,
      }}
    >
      {children}
    </motion.div>
  );
}
