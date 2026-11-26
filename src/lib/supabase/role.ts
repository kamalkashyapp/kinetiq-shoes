import { createClient } from './server';
import type { UserRole } from '@/types/database.types';

export interface UserSessionProfile {
  id: string;
  email: string;
  fullName: string | null;
  role: UserRole;
}

/**
 * Server-side session hydration helper.
 * Retrieves authenticated user and their profile role directly from database
 * without client-side waterfalls or flashing states.
 */
export async function getServerSessionProfile(): Promise<UserSessionProfile | null> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return null;
    }

    const { data: profile, error: profileError } = await (supabase
      .from('profiles') as any)
      .select('id, email, full_name, role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      // Fallback if profile row is not yet propagated
      return {
        id: user.id,
        email: user.email || '',
        fullName: (user.user_metadata?.full_name as string) || null,
        role: 'customer',
      };
    }

    return {
      id: profile.id,
      email: profile.email,
      fullName: profile.full_name,
      role: profile.role as UserRole,
    };
  } catch {
    return null;
  }
}

/**
 * Hard server-side admin guard.
 * Call in admin route handlers and server actions.
 */
export async function requireAdmin(): Promise<UserSessionProfile> {
  const profile = await getServerSessionProfile();
  if (!profile || profile.role !== 'admin') {
    throw new Error('UNAUTHORIZED_ADMIN_ACCESS');
  }
  return profile;
}
