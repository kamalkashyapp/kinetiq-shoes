'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';
import { easings } from '@/lib/motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.42,
        ease: easings.out,
      }}
    >
      {children}
    </motion.div>
  );
}
