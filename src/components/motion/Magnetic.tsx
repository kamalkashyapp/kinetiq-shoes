'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;   // Max displacement in px (default: 8px ceiling)
  className?: string;
}

export function Magnetic({
  children,
  strength = 8,
  className = '',
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Detect touch / coarse pointer
    const media = window.matchMedia('(pointer: coarse)');
    setIsTouch(media.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Clamp translation to strictly <= strength (8px)
    const distance = Math.hypot(middleX, middleY);
    const maxDist = Math.max(width, height) / 2;
    const factor = Math.min(distance / maxDist, 1);

    const clampedX = Math.max(-strength, Math.min(strength, (middleX / maxDist) * strength));
    const clampedY = Math.max(-strength, Math.min(strength, (middleY / maxDist) * strength));

    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (isTouch || shouldReduceMotion) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 25,
        mass: 0.5,
      }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
