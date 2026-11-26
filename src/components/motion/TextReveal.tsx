'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';
import { durations, easings, staggers } from '@/lib/motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  staggerMs?: number;
  delay?: number;
}

export function TextReveal({
  text,
  className = '',
  as: Component = 'p',
  staggerMs = staggers.text * 1000,
  delay = 0,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Instant static render for reduced-motion
  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  // Split into words while preserving spacing
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerMs / 1000,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: durations.slow,
        ease: easings.out,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        className="inline-block overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden align-top mr-[0.25em] last:mr-0">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
