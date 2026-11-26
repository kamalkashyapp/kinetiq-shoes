# AGENTS.md — KINETIQ

Project context for the agent. Re-read this at the start of every session, and before
any phase. If your work deviates from this file, the file wins.

## What we are building

KINETIQ — a premium, fully animated sneaker e-commerce site. Storefront with editorial art
direction, customer accounts with Google login, a real admin dashboard with real analytics,
and Cashfree payments in INR.

Fictional brand. Never use real trademarks (Nike, Adidas, Puma, New Balance, On, Asics,
Salomon, etc.) in copy, imagery, logos, or generated assets. No celebrity likenesses.

## Non-negotiable stack

Next.js (App Router, TS strict) · Tailwind · shadcn/ui + Radix · `motion/react` · GSAP +
ScrollTrigger · Lenis · Supabase (Postgres/Auth/Storage/RLS/Realtime) · Zustand ·
Cashfree PG · Recharts · Playwright.

Do not substitute the animation library, the database, or the payment provider. Do not add
a state library beyond Zustand. Do not add a component library beyond shadcn/ui.

## Design tokens

Full token block lives in `KINETIQ-Antigravity-Master-Prompt.md` section 3. Implement it
verbatim in `globals.css` and wire it into the Tailwind theme. Any new value must be added
as a token first, used second.

Short version: bone canvas `#F3F0E9`, ink `#0B0B0C`, smoke `#8A867E`, acid `#D9FF43`,
clay `#B4553A`, signal `#1E5BFF`. Display type at line-height 0.92 and tracking -0.03em.
Mono micro-labels at 11px, uppercase, tracking 0.14em. 8px spacing baseline, 12-column
grid, 1440px max, asymmetric by default.

## Collections

- **TERRA** — trail / all-terrain. Rugged, lugged outsole, earth tones, clay accents.
- **PULSE** — performance running. Technical, engineered mesh, acid accents.
- **FORM** — lifestyle / everyday. Minimal, monochrome, clean leather and suede.

## Voice

Confident, short, technical. No exclamation marks. No "amazing", "game-changing",
"revolutionary". Say what the shoe does, with numbers where numbers exist.

## Motion rules

Single source of truth: `src/lib/motion.ts`. Every primitive has a reduced-motion fallback
that renders the final state instantly. Animate transform/opacity/filter only. Nothing
over 1.2s except scroll-linked sections. Interaction never waits on an entrance animation.

## Commerce rules

- Prices, discounts, shipping, and tax are computed **server-side only**. The client never
  sends an amount we trust.
- Stock is decremented only in the Cashfree webhook handler, inside a transaction, guarded
  by idempotency on the Cashfree payment id.
- The redirect back from Cashfree is a hint, not a source of truth. Reconcile server-side.
- Order status transitions are one-directional and logged. No silent reversals.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY          # server only, never imported into a client component
NEXT_PUBLIC_SITE_URL
CASHFREE_APP_ID
CASHFREE_SECRET_KEY                # server only
CASHFREE_ENV=sandbox
CASHFREE_API_VERSION
RESEND_API_KEY
NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE
```

## File conventions

```
app/(store)/...           storefront routes, shared store layout
app/(admin)/admin/...     admin routes, separate layout + rail
app/auth/...              auth routes
app/api/...               route handlers
components/ui/            shadcn primitives, restyled
components/store/         storefront components
components/admin/         admin-only components
components/motion/        animation primitives
lib/supabase/             client, server, admin, middleware
lib/motion.ts             motion tokens + hooks
lib/analytics.ts          tracker
db/                       migrations + seed
```

## Definition of done for any phase

Typecheck clean, build clean, browser pass at 390/768/1440, screenshots attached to the
walkthrough, no placeholder copy, no default-looking shadcn components, and every async
surface has loading/empty/error states.

## When stuck

State the root cause in one sentence before attempting a fix. If the fix spans more than
three files, stop and write a short plan first.

## What NOT to do

- Do not mock data where a real query is possible.
- Do not leave commented-out code, `console.log`, or `any` in shipped code.
- Do not hide admin routes only in the UI — gate them server-side.
- Do not ship an animation that ignores `prefers-reduced-motion`.
- Do not exceed the component budget for a phase by inventing extra features.
