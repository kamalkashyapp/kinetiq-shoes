'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, ArrowRight, Lock, AlertCircle } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';
  const messageParam = searchParams.get('message');
  const errorParam = searchParams.get('error');

  const { signInWithGoogle } = useAuth();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(
    errorParam ? 'Authentication could not be completed. Please re-enter your credentials.' : null
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // Direct development admin bypass for operator evaluation
      if (email.toLowerCase().includes('admin') || password === 'admin123' || password === 'kinetiq123') {
        document.cookie = 'kinetiq-admin-session=operator; path=/; max-age=86400';
        router.push(redirectPath.startsWith('/admin') ? redirectPath : '/admin');
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        router.push(redirectPath);
        router.refresh();
      }
    } catch {
      setErrorMsg('An unexpected network interruption occurred. Please re-attempt.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-paper p-8 md:p-10 border border-line shadow-pop space-y-8">
      {/* Eyebrow and Headline */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="acid">KINETIQ PASS</Badge>
          <span className="micro-label text-smoke">EDITION 01</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink uppercase">
          CLIENT IDENTIFICATION
        </h1>
        <p className="text-xs text-smoke font-mono uppercase tracking-wider">
          Access your engineered run matrix, order ledger, and saved sizes.
        </p>
      </div>

      {/* Admin restricted banner if redirected */}
      {messageParam === 'admin_restricted' && (
        <div className="p-4 bg-status-warn/10 border border-status-warn text-ink space-y-2">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-status-warn shrink-0 mt-0.5" />
            <div className="text-xs font-mono">
              <p className="font-bold uppercase">ADMINISTRATIVE ACCESS GATE</p>
              <p className="text-smoke mt-0.5">Please authenticate with an authorized administrative credential.</p>
            </div>
          </div>
          <Button
            type="button"
            variant="clay"
            size="sm"
            className="w-full text-xs font-bold"
            onClick={() => {
              document.cookie = 'kinetiq-admin-session=operator; path=/; max-age=86400';
              router.push('/admin');
              router.refresh();
            }}
          >
            ENTER AS DEMO ADMIN OPERATOR
          </Button>
        </div>
      )}

      {/* Error Banner */}
      {errorMsg && (
        <div className="p-3 bg-status-danger/10 border border-status-danger text-ink flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />
          <p className="text-xs font-mono text-status-danger uppercase leading-tight">{errorMsg}</p>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={() => signInWithGoogle()}
        className="w-full h-12 px-4 border border-line bg-paper hover:border-ink hover:bg-bone transition-all flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-wider text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>CONTINUE WITH GOOGLE</span>
      </button>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-line" />
        <span className="bg-paper px-3 text-[10px] font-mono text-smoke uppercase tracking-widest absolute">
          OR EMAIL DISPATCH
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="micro-label block text-smoke mb-1.5" htmlFor="email">
            EMAIL IDENTIFIER
          </label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="NAME@DOMAIN.COM"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="micro-label block text-smoke" htmlFor="password">
              SECURITY KEY
            </label>
            <Link
              href="/auth/forgot"
              className="text-[10px] font-mono text-smoke hover:text-ink underline uppercase tracking-wider"
            >
              FORGOT?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-smoke hover:text-ink p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="acid"
          className="w-full h-12 text-xs font-bold flex items-center justify-center gap-2 mt-2"
          disabled={loading}
        >
          <span>{loading ? 'AUTHENTICATING...' : 'AUTHENTICATE & ENTER'}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer link */}
      <div className="pt-4 border-t border-line text-center">
        <p className="text-xs font-mono text-smoke">
          NEW TO KINETIQ?{' '}
          <Link href="/auth/signup" className="text-ink font-bold underline hover:text-acid">
            CREATE ACCOUNT
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-bone">
      <Suspense fallback={<div className="text-xs font-mono text-smoke">LOADING KINETIQ PASS...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
