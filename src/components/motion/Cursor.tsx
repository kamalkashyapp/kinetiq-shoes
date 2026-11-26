'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';

export function Cursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing physics for outer ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.5 });

  useEffect(() => {
    // Check coarse pointer
    const media = window.matchMedia('(pointer: coarse)');
    setIsTouchDevice(media.matches);
    if (media.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect target element for interactive states or custom cursor labels
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [data-cursor-interactive]');
        const customCursor = target.closest('[data-cursor]') as HTMLElement | null;

        setIsPointer(!!interactive || !!customCursor);
        setLabel(customCursor?.getAttribute('data-cursor') || null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  // Disabled on touch devices and under reduced motion
  if (isTouchDevice || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Precision Ink Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-ink -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          opacity: label ? 0 : 1,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Ring / Contextual Label Slot */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 border transition-colors duration-150 will-change-transform ${
          label
            ? 'bg-ink text-bone border-ink px-3 py-1 rounded-pill shadow-pop'
            : isPointer
            ? 'border-acid bg-acid/15 w-10 h-10'
            : 'border-ink/30 w-7 h-7'
        }`}
        style={{
          x: springX,
          y: springY,
        }}
      >
        {label && (
          <span className="micro-label text-[9px] text-bone font-mono tracking-widest uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
