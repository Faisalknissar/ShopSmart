import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async (options?: {
  cookieOptions?: { name: string };
}) => {
  const cookieStore = cookies();
  const isAdminContext = options?.cookieOptions?.name?.includes("admin");

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          try {
            const allCookies = cookieStore.getAll();
            // If admin context, only return admin cookies
            if (isAdminContext) {
              return allCookies
                .filter((cookie) => cookie.name.includes("admin"))
                .map(({ name, value }) => ({
                  name,
                  value,
                }));
            }
            // Otherwise return all cookies (or filter for user cookies if needed)
            return allCookies.map(({ name, value }) => ({
              name,
              value,
            }));
          } catch (error) {
            // If cookies() is called in an environment where it's not allowed
            return [];
          }
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // If we have a specific cookie name option, use it to prefix the cookie
              if (options?.cookieOptions?.name) {
                const newName = name.replace(
                  "sb-",
                  `${options.cookieOptions.name}-`,
                );
                cookieStore.set(newName, value, options);
              } else {
                cookieStore.set(name, value, options);
              }
            });
          } catch (error) {
            // If cookies() is called in an environment where it's not allowed
            // Silent fail - don't log errors that might cause header issues
          }
        },
      },
      ...options,
    },
  );
};
