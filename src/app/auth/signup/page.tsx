'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const supabase = createClient();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredSize, setPreferredSize] = useState('10.0');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            preferred_size: parseFloat(preferredSize) || 10.0,
            marketing_opt_in: marketingOptIn,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/account');
        }, 1500);
      }
    } catch {
      setErrorMsg('An unexpected registration error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-bone">
      <div className="w-full max-w-md bg-paper p-8 md:p-10 border border-line shadow-pop space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="clay">REGISTRATION</Badge>
            <span className="micro-label text-smoke">SERIES 01</span>
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink uppercase">
            ESTABLISH ACCOUNT
          </h1>
          <p className="text-xs text-smoke font-mono uppercase tracking-wider">
            Join the KINETIQ registry for priority release access and sizing profiles.
          </p>
        </div>

        {success ? (
          <div className="p-6 bg-status-success/10 border border-status-success text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-status-success mx-auto" />
            <h3 className="font-display font-bold text-lg text-ink">ACCOUNT ESTABLISHED</h3>
            <p className="text-xs font-mono text-smoke">Redirecting to your customer dashboard...</p>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="p-3 bg-status-danger/10 border border-status-danger text-ink flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-status-danger shrink-0 mt-0.5" />
                <p className="text-xs font-mono text-status-danger uppercase leading-tight">{errorMsg}</p>
              </div>
            )}

            {/* Google OAuth Option */}
            <button
              type="button"
              onClick={() => signInWithGoogle()}
              className="w-full h-12 px-4 border border-line bg-paper hover:border-ink hover:bg-bone transition-all flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-wider text-ink"
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
              <span>REGISTER WITH GOOGLE</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-line" />
              <span className="bg-paper px-3 text-[10px] font-mono text-smoke uppercase tracking-widest absolute">
                OR REGISTER DIRECT
              </span>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="micro-label block text-smoke mb-1.5" htmlFor="name">
                  FULL NAME
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="E.G. ARJUN KAPOOR"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="micro-label block text-smoke mb-1.5" htmlFor="signup-email">
                  PRIMARY EMAIL
                </label>
                <Input
                  id="signup-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="NAME@DOMAIN.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="micro-label block text-smoke mb-1.5" htmlFor="signup-password">
                  SECURITY KEY (MIN 8 CHARACTERS)
                </label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    autoComplete="new-password"
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

              <div>
                <label className="micro-label block text-smoke mb-1.5" htmlFor="size">
                  PREFERRED SNEAKER SIZE (US MENS)
                </label>
                <select
                  id="size"
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  className="w-full h-11 bg-paper px-4 text-xs font-mono border border-line focus:outline-none focus:border-ink"
                >
                  {['7.0', '7.5', '8.0', '8.5', '9.0', '9.5', '10.0', '10.5', '11.0', '11.5', '12.0'].map((sz) => (
                    <option key={sz} value={sz}>
                      US {sz} // EU {Math.round(parseFloat(sz) * 1.25 + 32)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-hair border-line text-ink focus:ring-0"
                />
                <label htmlFor="marketing" className="text-[11px] font-mono text-smoke leading-tight cursor-pointer">
                  RECEIVE DIRECT TECHNICAL DISPATCHES FOR LAB EXPERIMENTAL DROPS
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full h-12 text-xs font-bold flex items-center justify-center gap-2 mt-4"
                disabled={loading}
              >
                <span>{loading ? 'REGISTERING IDENTIFIER...' : 'CREATE ACCOUNT'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        )}

        <div className="pt-4 border-t border-line text-center">
          <p className="text-xs font-mono text-smoke">
            ALREADY REGISTERED?{' '}
            <Link href="/auth/login" className="text-ink font-bold underline hover:text-acid">
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
