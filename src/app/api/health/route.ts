import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json(
    {
      status: 'healthy',
      system: 'KINETIQ Core E-Commerce',
      version: '0.1.0',
      phase: 'Phase 0 — Scaffold & Design Tokens',
      timestamp,
      environment: process.env.NODE_ENV,
      services: {
        database: 'ready',
        payments: 'sandbox',
        motion: 'active',
        locale: 'en-IN',
        currency: 'INR',
      },
    },
    { status: 200 }
  );
}
