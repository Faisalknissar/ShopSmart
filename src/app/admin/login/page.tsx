"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Create Supabase client with admin context
  const supabase = createClient({
    cookieOptions: { name: "sb-admin-auth" },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Login attempt with email:", email);

      // Sign in with email and password using admin context
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        console.error("Sign in error:", signInError);
        throw signInError;
      }

      if (!data.user) {
        console.error("No user returned from authentication");
        throw new Error("No user returned from authentication");
      }

      console.log("User authenticated successfully, user ID:", data.user.id);

      // Check if the user is an admin
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_type")
        .eq("id", data.user.id)
        .single();

      console.log("Admin check response:", userData, userError);

      if (userError) {
        console.error("Error checking user type:", userError);
        throw userError;
      }

      console.log("User type from database:", userData.user_type);

      if (userData.user_type !== "admin") {
        console.log("User is not an admin, signing out");
        // Sign out the user if they're not an admin
        await supabase.auth.signOut();
        throw new Error("You do not have admin privileges");
      }

      // Redirect to admin dashboard
      console.log("Authentication successful, redirecting to admin dashboard");

      // Use window.location for a hard redirect
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
