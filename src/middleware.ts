import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cookie names for different auth contexts
const ADMIN_AUTH_COOKIE = "sb-admin-auth";
const USER_AUTH_COOKIE = "sb-user-auth";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAdminAuthRoute =
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname === "/admin/signup";
  const isUserAuthRoute =
    req.nextUrl.pathname === "/(auth)/sign-in" ||
    req.nextUrl.pathname === "/(auth)/sign-up";

  // Create Supabase client with the appropriate cookie context
  const cookiePrefix = isAdminRoute ? ADMIN_AUTH_COOKIE : USER_AUTH_COOKIE;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Filter cookies based on the route context
          return req.cookies
            .getAll()
            .filter((cookie) => {
              // For admin routes, only use admin auth cookies
              // For user routes, only use user auth cookies
              if (isAdminRoute) {
                return cookie.name.startsWith(ADMIN_AUTH_COOKIE);
              } else {
                return cookie.name.startsWith(USER_AUTH_COOKIE);
              }
            })
            .map(({ name, value }) => ({
              name,
              value,
            }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Rename the cookie to include the appropriate prefix
            const newName = name.replace("sb-", cookiePrefix + "-");
            res.cookies.set(newName, value, options);
          });
        },
      },
    },
  );

  // Refresh session if expired - required for Server Components
  // Use try/catch to handle potential errors
  let session = null;
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!error && data) {
      session = data.session;
    }
  } catch (err) {
    console.error("Error getting session:", err);
  }

  // Admin routes protection
  if (isAdminRoute && !isAdminAuthRoute) {
    // Create a new response for redirects to avoid header issues
    const redirectUrl = new URL("/admin/login", req.url);

    try {
      // Only proceed with admin check if we have a session
      if (session) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        // If not an admin, redirect to admin login
        if (userError || (userData && userData.user_type !== "admin")) {
          return NextResponse.redirect(redirectUrl);
        }
      } else {
        // No session, redirect to admin login
        return NextResponse.redirect(redirectUrl);
      }
    } catch (err) {
      // In case of any error, redirect to admin login for safety
      console.error("Error checking admin status:", err);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // User routes protection - prevent admin users from accessing user routes
  // Skip this check for auth routes and public pages
  if (!isAdminRoute && !isUserAuthRoute && req.nextUrl.pathname !== "/") {
    try {
      if (session) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("user_type")
          .eq("id", session.user.id)
          .single();

        // If admin trying to access user routes, redirect to home
        if (!userError && userData && userData.user_type === "admin") {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    } catch (err) {
      console.error("Error checking user status:", err);
    }
  }

  return res;
}

// Ensure the middleware is only called for relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api/payments/webhook (webhook endpoints)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/payments/webhook).*)",
  ],
};
