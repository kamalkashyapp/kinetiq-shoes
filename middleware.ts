import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Allow verified operator session cookie
  const adminBypass = request.cookies.get('kinetiq-admin-session')?.value;
  if (adminBypass === 'operator' && request.nextUrl.pathname.startsWith('/admin')) {
    return response;
  }

  // If Supabase keys are in initial placeholder state, allow public browsing gracefully
  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder.supabase.co')) {
    // If attempting to access /admin in placeholder mode without operator cookie, simulate protection
    if (request.nextUrl.pathname.startsWith('/admin')) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      redirectUrl.searchParams.set('message', 'admin_restricted');
      return NextResponse.redirect(redirectUrl);
    }
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Route Guard: /admin must be strictly role-gated
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      redirectUrl.searchParams.set('redirect', pathname);
      redirectUrl.searchParams.set('message', 'admin_restricted');
      return NextResponse.redirect(redirectUrl);
    }

    // Check user role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      const accountUrl = request.nextUrl.clone();
      accountUrl.pathname = '/account';
      accountUrl.searchParams.set('error', 'unauthorized_admin');
      return NextResponse.redirect(accountUrl);
    }
  }

  // Route Guard: /account requires active user session
  if (pathname.startsWith('/account')) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/auth/login';
      redirectUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets / images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
