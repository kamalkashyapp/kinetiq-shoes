'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ReducedMotionContextType {
  prefersReducedMotion: boolean;
  forcedReducedMotion: boolean;
  toggleForcedReducedMotion: () => void;
  shouldReduceMotion: boolean;
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  prefersReducedMotion: false,
  forcedReducedMotion: false,
  toggleForcedReducedMotion: () => {},
  shouldReduceMotion: false,
});

export function ReducedMotionProvider({ children }: { children: React.ReactNode }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [forcedReducedMotion, setForcedReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleForcedReducedMotion = () => {
    setForcedReducedMotion((prev) => !prev);
  };

  const shouldReduceMotion = prefersReducedMotion || forcedReducedMotion;

  return (
    <ReducedMotionContext.Provider
      value={{
        prefersReducedMotion,
        forcedReducedMotion,
        toggleForcedReducedMotion,
        shouldReduceMotion,
      }}
    >
      {children}
    </ReducedMotionContext.Provider>
  );
}

export function useReducedMotion() {
  const context = useContext(ReducedMotionContext);
  return context.shouldReduceMotion;
}

export function useReducedMotionManager() {
  return useContext(ReducedMotionContext);
}
