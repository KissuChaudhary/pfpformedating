import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Check if the user is authenticated
  let user = null
  try {
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    console.error('Proxy Auth Error:', error)
  }

  const pathname = request.nextUrl.pathname

  // Public routes that anyone can access
  const publicRoutes = ['/login', '/signup', '/auth', '/error', '/', '/pricing', '/about', '/terms', '/privacy-policy', '/refund-policy']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/auth'))

  // API routes should pass through
  if (pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return response
  }

  // Not authenticated - redirect to login for protected routes
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Not authenticated and on public route - allow
  if (!user) {
    return response
  }

  // === AUTHENTICATED USER - STRICT ONBOARDING TUNNEL ===

  // Get user's onboarding status
  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_preview_used, credits')
    .eq('id', user.id)
    .single()

  // Check if user has paid
  const { data: payments } = await supabase
    .from('dodo_payments')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'succeeded')
    .limit(1)

  const trialUsed = profile?.trial_preview_used === true
  const hasCredits = (profile?.credits || 0) > 0
  const hasPaid = payments && payments.length > 0
  const isUnlockedUser = hasPaid || hasCredits

  // Routes allowed during onboarding tunnel (before payment)
  const onboardingRoutes = ['/models/create', '/preview']
  const isOnboardingRoute = onboardingRoutes.some(route => pathname.startsWith(route))

  // Buy credits page is always allowed for authenticated users
  const isBuyCreditsRoute = pathname.startsWith('/buy-credits')

  // If user is logged in and on login page, redirect appropriately
  if (pathname === '/login') {
    if (isUnlockedUser) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else if (trialUsed) {
      // Trial used but no payment - send to buy credits
      return NextResponse.redirect(new URL('/buy-credits', request.url))
    } else {
      // New user - send to create model
      return NextResponse.redirect(new URL('/models/create', request.url))
    }
  }

  // === UNLOCKED USERS (paid or have credits) - Full access ===
  if (isUnlockedUser) {
    return response
  }

  // === TRIAL USED BUT NOT PAID - Only allow buy-credits and existing preview ===
  if (trialUsed && !isUnlockedUser) {
    // Allow buy-credits page
    if (isBuyCreditsRoute) {
      return response
    }

    // Allow viewing their existing preview
    if (pathname.startsWith('/preview/')) {
      return response
    }

    // Block everything else - redirect to buy credits
    return NextResponse.redirect(new URL('/buy-credits', request.url))
  }

  // === NEW USER (trial not used) - Only allow model creation ===
  if (!trialUsed) {
    // Allow model creation
    if (pathname.startsWith('/models/create')) {
      return response
    }

    // Allow preview page (they'll land here after creating model)
    if (pathname.startsWith('/preview/')) {
      return response
    }

    // Block everything else - redirect to model creation
    return NextResponse.redirect(new URL('/models/create', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}