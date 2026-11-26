'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${siteUrl}/auth/callback?next=/account/settings`,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch {
      setErrorMsg('Could not dispatch recovery instructions. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-bone">
      <div className="w-full max-w-md bg-paper p-8 md:p-10 border border-line shadow-pop space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline">RECOVERY</Badge>
            <span className="micro-label text-smoke">SECURITY PROTOCOL</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink uppercase">
            RECOVER ACCESS
          </h1>
          <p className="text-xs text-smoke font-mono uppercase tracking-wider">
            Input your registered email to receive an authenticated reset link.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-status-success/10 border border-status-success text-center space-y-4">
            <CheckCircle2 className="w-8 h-8 text-status-success mx-auto" />
            <h3 className="font-display font-bold text-lg text-ink">DISPATCH TRANSMITTED</h3>
            <p className="text-xs font-mono text-smoke leading-relaxed">
              If an account is associated with {email}, you will receive a secure authentication link shortly.
            </p>
            <Link href="/auth/login" className="inline-block pt-2">
              <Button variant="secondary" size="sm">
                RETURN TO SIGN IN
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-status-danger/10 border border-status-danger text-ink flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />
                <p className="text-xs font-mono text-status-danger uppercase leading-tight">{errorMsg}</p>
              </div>
            )}

            <div>
              <label className="micro-label block text-smoke mb-1.5" htmlFor="reset-email">
                REGISTERED EMAIL
              </label>
              <Input
                id="reset-email"
                type="email"
                required
                autoComplete="email"
                placeholder="NAME@DOMAIN.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full h-12 text-xs font-bold flex items-center justify-center gap-2 mt-4"
              disabled={loading}
            >
              <span>{loading ? 'TRANSMITTING...' : 'DISPATCH RESET LINK'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        <div className="pt-4 border-t border-line flex items-center justify-between">
          <Link
            href="/auth/login"
            className="text-xs font-mono text-smoke hover:text-ink flex items-center gap-1.5 uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO LOGIN</span>
          </Link>
          <Link
            href="/auth/signup"
            className="text-xs font-mono text-smoke hover:text-ink underline uppercase"
          >
            NEW CLIENT
          </Link>
        </div>
      </div>
    </div>
  );
}
