import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll().map(({ name, value }) => ({
            name,
            value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
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

  // Check if the request is for the admin area and user is not an admin
  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    req.nextUrl.pathname !== "/admin/login" &&
    req.nextUrl.pathname !== "/admin/signup"
  ) {
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
