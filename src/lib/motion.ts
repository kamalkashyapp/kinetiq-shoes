// KINETIQ Motion System — Single Source of Truth
// Strict adherence to AGENTS.md motion rules:
// - Hardware-accelerated transform/opacity/filter only
// - Reduced-motion fallback renders final state instantly
// - Nothing over 1.2s except scroll-linked scrubbed narratives
// - Entrances ease out, exits faster than entrances

export const durations = {
  fast: 0.16,        // 160ms: Micro-interactions, hover highlights, icon states
  base: 0.26,        // 260ms: Sheet & drawer open/close, dropdowns
  slow: 0.48,        // 480ms: Card entrance, section fades
  cinematic: 0.90,   // 900ms: Hero narrative reveals, collection banner sweeps
  maxAllowed: 1.20,  // Hard ceiling for non-scroll animations
} as const;

export const easings = {
  // Editorial ease-out: confident, smooth deceleration with zero bounce
  out: [0.16, 1, 0.3, 1] as const,
  // Editorial ease-in-out: continuous, measured symmetric transitions
  inOut: [0.65, 0, 0.35, 1] as const,
  // Micro-snap: reserved strictly for tiny interactive confirmations
  snap: [0.34, 1.56, 0.64, 1] as const,
};

export const springs = {
  soft: {
    type: 'spring',
    stiffness: 180,
    damping: 26,
    mass: 0.9,
  } as const,
  snappy: {
    type: 'spring',
    stiffness: 420,
    damping: 34,
    mass: 0.7,
  } as const,
};

export const staggers = {
  text: 0.028,      // 28ms word/line stagger
  cards: 0.08,      // 80ms grid card stagger
  specs: 0.04,      // 40ms technical table row stagger
} as const;

// Transition presets
export const transitions = {
  pageExit: {
    duration: 0.18,
    ease: easings.out,
  },
  pageEnter: {
    duration: 0.42,
    ease: easings.out,
  },
  drawer: {
    duration: durations.base,
    ease: easings.out,
  },
  modal: {
    duration: durations.base,
    ease: easings.out,
  },
  tooltip: {
    duration: durations.fast,
    ease: easings.out,
  },
};
