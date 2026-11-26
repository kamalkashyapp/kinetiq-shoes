'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import type { UserRole } from '@/types/database.types';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
  signOut: async () => {},
  signInWithGoogle: async () => {},
});

export function AuthProvider({
  children,
  initialUser = null,
  initialRole = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
  initialRole?: UserRole | null;
}) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [role, setRole] = useState<UserRole | null>(initialRole);
  const [isLoading, setIsLoading] = useState(!initialUser);

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function fetchUserRole(userId: string) {
      try {
        const { data } = await (supabase
          .from('profiles') as any)
          .select('role')
          .eq('id', userId)
          .single();

        if (mounted && data) {
          setRole(data.role as UserRole);
        }
      } catch {
        // Fallback to customer role
        if (mounted) setRole('customer');
      }
    }

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsLoading(false);

      if (currentUser) {
        await fetchUserRole(currentUser.id);
      } else {
        setRole(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    window.location.href = '/';
  };

  const signInWithGoogle = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        signOut,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
