'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '@/providers/ReducedMotionProvider';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ScrollRailProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  totalPanels?: number;
}

export function ScrollRail({
  children,
  className = '',
  title = 'LOOKBOOK // HORIZONTAL RAIL',
  totalPanels = 4,
}: ScrollRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activePanel, setActivePanel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate percentage to translate: e.g. for 4 panels, move by -75%
  const maxTranslatePercent = -((totalPanels - 1) / totalPanels) * 100;
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${maxTranslatePercent}%`]);

  // Update progress indicator
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const idx = Math.min(Math.floor(latest * totalPanels), totalPanels - 1);
      setActivePanel(idx);
    });
  }, [scrollYProgress, totalPanels]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      if (railRef.current) {
        railRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      }
    } else if (e.key === 'ArrowLeft') {
      if (railRef.current) {
        railRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      }
    }
  };

  if (shouldReduceMotion) {
    return (
      <section className={`py-12 border-b border-line bg-bone ${className}`}>
        <div className="max-w-page mx-auto px-4 md:px-10 mb-6 flex justify-between items-center">
          <span className="micro-label text-smoke">{title}</span>
          <span className="micro-label text-smoke">[PANEL {activePanel + 1} / {totalPanels}]</span>
        </div>
        <div
          ref={railRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex gap-6 overflow-x-auto px-4 md:px-10 pb-6 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-signal"
        >
          {children}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`relative h-[300vh] bg-bone border-b border-line focus-visible:outline-none ${className}`}
      aria-label={title}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden flex flex-col justify-between py-8 px-4 md:px-10">
        {/* Rail Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-acid" />
            <span className="micro-label text-ink font-bold">{title}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="micro-label text-smoke">
              USE SCROLL OR ARROWS ← → TO NAVIGATE
            </span>
            <span className="micro-label bg-ink text-bone px-2 py-0.5">
              0{activePanel + 1} / 0{totalPanels}
            </span>
          </div>
        </div>

        {/* Translating Track */}
        <div className="my-auto overflow-hidden w-full">
          <motion.div
            style={{ x }}
            className="flex gap-8 will-change-transform items-center"
          >
            {children}
          </motion.div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full pt-4 border-t border-line flex items-center justify-between gap-6">
          <span className="micro-label text-smoke text-[9px]">SCROLL-LINKED HORIZONTAL TRANSLATION</span>
          <div className="flex-1 h-1 bg-line overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
              className="h-full bg-ink"
            />
          </div>
          <span className="micro-label text-smoke text-[9px]">{totalPanels} PANELS CLAMPED</span>
        </div>
      </div>
    </section>
  );
}

export function ScrollRailPanel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 w-[85vw] sm:w-[55vw] lg:w-[40vw] h-[58vh] max-h-[520px] border border-line bg-paper shadow-sm p-4 flex flex-col justify-between ${className}`}
    >
      {children}
    </div>
  );
}
