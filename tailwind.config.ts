import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "var(--color-bone)",
        paper: "var(--color-paper)",
        ink: {
          DEFAULT: "var(--color-ink)",
          soft: "var(--color-ink-soft)",
        },
        smoke: "var(--color-smoke)",
        line: {
          DEFAULT: "var(--color-line)",
          soft: "var(--color-line-soft)",
        },
        acid: "var(--color-acid)",
        clay: "var(--color-clay)",
        signal: "var(--color-signal)",
        status: {
          success: "var(--color-success)",
          warn: "var(--color-warn)",
          danger: "var(--color-danger)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        micro: ["var(--text-micro)", { lineHeight: "1.3", letterSpacing: "var(--tracking-micro)" }],
        xs: ["var(--text-xs)", { lineHeight: "1.4" }],
        sm: ["var(--text-sm)", { lineHeight: "1.45" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-body)" }],
        lg: ["var(--text-lg)", { lineHeight: "1.4" }],
        xl: ["var(--text-xl)", { lineHeight: "1.3", letterSpacing: "var(--tracking-display)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "1.25", letterSpacing: "var(--tracking-display)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "1.2", letterSpacing: "var(--tracking-display)" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "1.18", letterSpacing: "var(--tracking-display)" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "1.15", letterSpacing: "var(--tracking-display)" }],
        "6xl": ["var(--text-6xl)", { lineHeight: "1.12", letterSpacing: "var(--tracking-display)" }],
      },
      letterSpacing: {
        display: "var(--tracking-display)",
        micro: "var(--tracking-micro)",
      },
      lineHeight: {
        display: "var(--leading-display)",
        body: "var(--leading-body)",
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-7": "var(--space-7)",
        "space-8": "var(--space-8)",
        "space-9": "var(--space-9)",
        "space-10": "var(--space-10)",
        "space-11": "var(--space-11)",
      },
      maxWidth: {
        page: "var(--page-max)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        hair: "var(--radius-hair)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        drawer: "var(--shadow-drawer)",
        pop: "var(--shadow-pop)",
      },
      transitionTimingFunction: {
        "editorial-out": "var(--ease-out)",
        "editorial-in-out": "var(--ease-in-out)",
        "editorial-snap": "var(--ease-snap)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        base: "var(--dur-base)",
        slow: "var(--dur-slow)",
        cinematic: "var(--dur-cinematic)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
