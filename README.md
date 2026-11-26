# KINETIQ — Kinetic Sneaker E-Commerce

> "Weightless by design."

KINETIQ is a production-grade, editorial kinetic retail sneaker e-commerce platform built with Next.js (App Router, TypeScript strict), Tailwind CSS, Lenis, `motion/react`, Supabase (Postgres, Auth, Storage, RLS), and Cashfree Payment Gateway.

---

## Technical Stack

- **Framework**: Next.js 14 (App Router, TypeScript strict)
- **Styling**: Tailwind CSS with custom editorial tokens (`globals.css`)
- **Primitives**: Radix UI + restyled shadcn components
- **Motion**: `motion/react`, GSAP + ScrollTrigger, Lenis smooth scroll
- **Database & Auth**: Supabase (PostgreSQL, Row Level Security, Google OAuth)
- **Payments**: Cashfree PG (Server-created orders, signed webhooks, idempotent stock decrement)
- **State**: Zustand (Cart / Wishlist UI state)

---

## Local Setup

### 1. Prerequisites
- Node.js >= 18.18 (tested on Node v20/v24)
- npm >= 9.0

### 2. Installation
```bash
git clone <repo-url>
cd Byson-Shoe
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` and populate keys:
```bash
cp .env.example .env.local
```

Key environment variables:
```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-server-only
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CASHFREE_APP_ID=your-cashfree-app-id
CASHFREE_SECRET_KEY=your-cashfree-secret-key-server-only
CASHFREE_ENV=sandbox
CASHFREE_API_VERSION=2023-08-01
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_ANALYTICS_SAMPLE_RATE=1.0
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront.

---

## Google Cloud Console & Supabase Auth Setup

To enable Google OAuth authentication end-to-end:

### 1. Google Cloud Console
1. Navigate to [Google Cloud Console](https://console.cloud.google.com/) > **APIs & Services** > **Credentials**.
2. Configure your **OAuth Consent Screen**:
   - User Type: **External**
   - App Name: `KINETIQ`
   - User Support Email: your email
   - Developer Contact: your email
   - Scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`
3. Click **Create Credentials** > **OAuth client ID**:
   - Application type: **Web application**
   - Name: `KINETIQ Storefront Web Client`
   - **Authorized JavaScript origins**:
     - `http://localhost:3000`
     - `https://your-production-domain.com`
   - **Authorized redirect URIs**:
     - `https://<YOUR-SUPABASE-PROJECT-ID>.supabase.co/auth/v1/callback`
4. Copy the generated **Client ID** and **Client Secret**.

### 2. Supabase Auth Provider Configuration
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) > Project > **Authentication** > **Providers**.
2. Locate **Google** and toggle it **Enabled**.
3. Paste the **Client ID** and **Client Secret** obtained from Google Cloud.
4. Under **URL Configuration**:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`, `https://your-production-domain.com/auth/callback`
5. Save changes. Users can now sign in via Google OAuth directly into the `profiles` table.

---

## Database Migrations & Seeding

1. Execute `db/schema.sql` in the Supabase SQL Editor to establish tables, triggers, and RLS policies.
2. Execute the seed script:
```bash
npm run seed
```
This seeds 3 collections (TERRA, PULSE, FORM), 24 products, ~288 variants with stock, 40 customer reviews, and 6 promotional discount codes.

---

## Developer Contract & Showcase

Visit [http://localhost:3000/design](http://localhost:3000/design) to inspect the complete visual token contract:
- Full fluid type scale (Bricolage Grotesque, Instrument Serif, Inter Tight, JetBrains Mono)
- Color swatches (Bone canvas, near-black Ink, Smoke, Acid highlight, Clay warmth)
- Spacing scale baseline (8px)
- Radius and border specimens
- Button, chip, and input variants
- Motion timing curves with reduced-motion simulation toggle
- Generative SVG placeholder art

---

## Health Check
Verify API health:
```bash
curl http://localhost:3000/api/health
```

---

## Verification & Typecheck
```bash
npm run typecheck
npm run build
```
