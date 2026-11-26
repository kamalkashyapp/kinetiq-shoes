import type { Metadata } from 'next';
import './globals.css';
import { fontDisplay, fontSerif, fontSans, fontMono } from '@/lib/fonts';
import { ReducedMotionProvider } from '@/providers/ReducedMotionProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { Header } from '@/components/store/Header';
import { Footer } from '@/components/store/Footer';
import { CartDrawer } from '@/components/store/CartDrawer';
import { Cursor } from '@/components/motion/Cursor';
import { AnalyticsTracker } from '@/components/store/AnalyticsTracker';
import { Suspense } from 'react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kinetiq.run';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'KINETIQ — Weightless by Design',
    template: '%s | KINETIQ',
  },
  description:
    'Kinetic footwear engineered with high-precision lattice cushioning, carbon vector propulsion, and aerodynamic lightness. Cashfree payments in INR.',
  keywords: [
    'sneakers',
    'kinetic footwear',
    'running shoes',
    'trail shoes',
    'carbon plate shoes',
    '3D printed lattice',
    'KINETIQ',
  ],
  authors: [{ name: 'KINETIQ Footwear Labs' }],
  creator: 'KINETIQ',
  publisher: 'KINETIQ Footwear Labs',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'KINETIQ — Weightless by Design',
    description:
      'Additive 3D lattice cushioning and aerospace carbon vector propulsion. High-precision sneaker engineering.',
    siteName: 'KINETIQ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KINETIQ — Weightless by Design',
    description:
      'Additive 3D lattice cushioning and aerospace carbon vector propulsion. High-precision sneaker engineering.',
    creator: '@kinetiq_run',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="bg-bone text-ink min-h-screen flex flex-col font-sans antialiased selection:bg-acid selection:text-ink">
        <AuthProvider>
          <ReducedMotionProvider>
            <SmoothScrollProvider>
              <ToastProvider>
                <Suspense fallback={null}>
                  <AnalyticsTracker />
                </Suspense>
                <Cursor />
                <Header />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
                <CartDrawer />
              </ToastProvider>
            </SmoothScrollProvider>
          </ReducedMotionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
