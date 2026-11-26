import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!rawBody) {
      return NextResponse.json({ error: 'Missing payload' }, { status: 400 });
    }

    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const {
      session_id,
      event_name,
      path,
      referrer,
      device,
      utm_source,
      utm_medium,
      utm_campaign,
      metadata,
    } = payload;

    if (!session_id || !event_name) {
      return NextResponse.json({ error: 'Missing required event telemetry fields' }, { status: 400 });
    }

    // Privacy-preserving unique visitor IP hash (SHA-256, salted per day)
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const daySalt = new Date().toISOString().slice(0, 10);
    const ipHash = crypto
      .createHash('sha256')
      .update(`${clientIp}-${daySalt}`)
      .digest('hex')
      .slice(0, 16);

    const supabase = createAdminClient() as any;

    if (supabase) {
      try {
        await supabase.from('analytics_events').insert({
          session_id: session_id,
          event_name: event_name,
          path: path || '/',
          referrer: referrer || null,
          device: device || 'desktop',
          country: 'IN',
          utm_source: utm_source || null,
          utm_medium: utm_medium || null,
          utm_campaign: utm_campaign || null,
          metadata: {
            ...(metadata || {}),
            ip_hash: ipHash,
          },
        });
      } catch (dbErr) {
        // Non-blocking telemetry ingestion
        console.warn('[api/track] Analytics DB ingestion notice:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      event: event_name,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[api/track] Ingestion failure:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
