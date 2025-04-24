"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const phone = formData.get("phone")?.toString();
  const userType = formData.get("user_type")?.toString() || "user"; // Get user_type from form, default to 'user'
  const isAdminSignup = userType === "admin";
  const supabase = await createClient();

  if (!email || !password || !phone) {
    return encodedRedirect(
      "error",
      isAdminSignup ? "/admin/signup" : "/sign-up",
      "Email, phone number, and password are required",
    );
  }

  // Validate phone number format (basic validation)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return encodedRedirect(
      "error",
      isAdminSignup ? "/admin/signup" : "/sign-up",
      "Please enter a valid phone number with country code (e.g., +1234567890)",
    );
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        email: email,
        phone: phone,
        user_type: userType, // Use the provided user_type
      },
    },
  });

  if (error) {
    return encodedRedirect(
      "error",
      isAdminSignup ? "/admin/signup" : "/sign-up",
      error.message,
    );
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        phone: phone,
        user_type: userType, // Use the provided user_type
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        // Error handling without console.error
        return encodedRedirect(
          "error",
          isAdminSignup ? "/admin/signup" : "/sign-up",
          "Error updating user. Please try again.",
        );
      }
    } catch (err) {
      // Error handling without console.error
      return encodedRedirect(
        "error",
        isAdminSignup ? "/admin/signup" : "/sign-up",
        "Error updating user. Please try again.",
      );
    }
  }

  // Redirect to appropriate page based on user type
  return encodedRedirect(
    "success",
    isAdminSignup ? "/admin/login" : "/sign-in",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;
  const otp = formData.get("otp") as string;
  const useOtp = formData.get("useOtp") as string;
  const redirectTo = (formData.get("redirect") as string) || "/dashboard";
  const isAdminLogin = redirectTo.includes("/admin");

  // Create Supabase client with the appropriate cookie context
  const cookieOptions = isAdminLogin
    ? { cookieOptions: { name: "sb-admin-auth" } }
    : { cookieOptions: { name: "sb-user-auth" } };
  const supabase = await createClient(cookieOptions);

  // Check if identifier is an email or phone number
  const isEmail = identifier.includes("@");
  const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier);

  if (!isEmail && !isPhone) {
    return encodedRedirect(
      "error",
      isAdminLogin ? "/admin/login" : "/sign-in",
      "Please enter a valid email or phone number",
    );
  }

  // If using OTP and we have an OTP code, verify it
  if (useOtp && otp) {
    const { error, data } = await supabase.auth.verifyOtp({
      phone: isPhone ? identifier : undefined,
      email: isEmail ? identifier : undefined,
      token: otp,
      type: "sms",
    });

    if (error) {
      return encodedRedirect(
        "error",
        isAdminLogin ? "/admin/login" : "/sign-in",
        error.message,
      );
    }

    // If this is an admin login, check if user has admin privileges
    if (isAdminLogin && data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_type")
        .eq("id", data.user.id)
        .single();

      if (userError || (userData && userData.user_type !== "admin")) {
        return encodedRedirect(
          "error",
          "/admin/login",
          "You do not have admin privileges",
        );
      }

      return redirect("/admin");
    }

    return redirect(redirectTo);
  }

  // Regular password login
  if (!useOtp && password) {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: isEmail ? identifier : undefined,
      phone: isPhone ? identifier : undefined,
      password,
    });

    if (error) {
      return encodedRedirect(
        "error",
        isAdminLogin ? "/admin/login" : "/sign-in",
        error.message,
      );
    }

    // If this is an admin login, check if user has admin privileges
    if (isAdminLogin && data.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("user_type")
        .eq("id", data.user.id)
        .single();

      if (userError || (userData && userData.user_type !== "admin")) {
        // Sign out the user if they're not an admin
        await supabase.auth.signOut();
        return encodedRedirect(
          "error",
          "/admin/login",
          "You do not have admin privileges",
        );
      }

      return redirect("/admin");
    }

    return redirect(redirectTo);
  }

  return encodedRedirect(
    "error",
    isAdminLogin ? "/admin/login" : "/sign-in",
    "Invalid login attempt",
  );
};

export const requestOtpAction = async (formData: FormData) => {
  const identifier = formData.get("identifier") as string;
  const supabase = await createClient();

  // Check if identifier is an email or phone number
  const isEmail = identifier.includes("@");
  const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier);

  if (!isEmail && !isPhone) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "Please enter a valid email or phone number",
    );
  }

  // Send OTP via SMS or Email
  const { error } = await supabase.auth.signInWithOtp({
    phone: isPhone ? identifier : undefined,
    email: isEmail ? identifier : undefined,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return encodedRedirect(
    "success",
    "/sign-in",
    `Verification code sent to ${isEmail ? "your email" : "your phone"}. Please enter it to sign in.`,
  );
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {});

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/dashboard/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async (formData?: FormData) => {
  // Determine if this is an admin sign-out based on the redirect path or formData
  const isAdminSignOut =
    formData?.get("isAdmin") === "true" ||
    (typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin"));

  // Create Supabase client with the appropriate cookie context
  const cookieOptions = isAdminSignOut
    ? { cookieOptions: { name: "sb-admin-auth" } }
    : { cookieOptions: { name: "sb-user-auth" } };
  const supabase = await createClient(cookieOptions);

  // Sign out the user from the specific context
  await supabase.auth.signOut();

  // Redirect to the appropriate sign-in page
  return redirect(isAdminSignOut ? "/admin/login" : "/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};
