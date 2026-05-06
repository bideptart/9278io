import { updateSession } from "@/lib/supabase/proxy"
import { NextResponse, type NextRequest } from "next/server"

// Public admin paths — must remain reachable without auth, otherwise the
// middleware would gate the login page itself and loop forever
// (307 -> /admin/login?next=/admin/login).
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/auth/callback", "/admin/logout"]

// Supabase magic-link + error pages used by the auth flow.
const PUBLIC_AUTH_PATHS = ["/auth/callback", "/auth/error"]

// Public, high-traffic endpoints that don't need Supabase auth — running
// `supabase.auth.getUser()` on them adds ~100–300ms per request for no
// reason. Chat and pageview tracking are both anonymous.
const PUBLIC_API_PATHS = ["/api/chat", "/api/track"]

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Short-circuit any auth work for explicitly public admin paths so the
  // login page can never gate itself into a redirect loop.
  if (PUBLIC_ADMIN_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
    return NextResponse.next()
  }

  // Same bypass for the Supabase magic-link callback + error pages.
  if (PUBLIC_AUTH_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
    return NextResponse.next()
  }

  // Skip Supabase round-trip for anonymous public APIs.
  if (PUBLIC_API_PATHS.some((p) => path === p || path.startsWith(p + "/"))) {
    return NextResponse.next()
  }

  return await updateSession(req)
}

export const config = {
  // The middleware only gates the admin area and refreshes Supabase
  // sessions for it. Running on every public page burned ~100–300ms per
  // navigation on a Supabase round-trip that nothing else needs. Restrict
  // to `/admin/*` so the homepage, pricing, blog, etc. skip it entirely.
  matcher: ["/admin/:path*"],
}
