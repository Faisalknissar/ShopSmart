"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const fullName = formData.get("full_name")?.toString() || "";
  const phone = formData.get("phone")?.toString();
  const supabase = await createClient();

  if (!email || !password || !phone) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email, phone number, and password are required",
    );
  }

  // Validate phone number format (basic validation)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phone)) {
    return encodedRedirect(
      "error",
      "/sign-up",
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
        user_type: "user", // Default user type
      },
    },
  });

  if (error) {
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (user) {
    try {
      const { error: updateError } = await supabase.from("users").insert({
        id: user.id,
        user_id: user.id,
        name: fullName,
        email: email,
        phone: phone,
        user_type: "user",
        token_identifier: user.id,
        created_at: new Date().toISOString(),
      });

      if (updateError) {
        // Error handling without console.error
        return encodedRedirect(
          "error",
          "/sign-up",
          "Error updating user. Please try again.",
        );
      }
    } catch (err) {
      // Error handling without console.error
      return encodedRedirect(
        "error",
        "/sign-up",
        "Error updating user. Please try again.",
      );
    }
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const signInAction = async (formData: FormData) => {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;
  const otp = formData.get("otp") as string;
  const useOtp = formData.get("useOtp") as string;
  const redirectTo = (formData.get("redirect") as string) || "/dashboard";
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

  // If using OTP and we have an OTP code, verify it
  if (useOtp && otp) {
    const { error, data } = await supabase.auth.verifyOtp({
      phone: isPhone ? identifier : undefined,
      email: isEmail ? identifier : undefined,
      token: otp,
      type: "sms",
    });

    if (error) {
      return encodedRedirect("error", "/sign-in", error.message);
    }

    // Check if user is an admin
    if (redirectTo.includes("/admin")) {
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
      return encodedRedirect("error", "/sign-in", error.message);
    }

    // Check if user is an admin
    if (redirectTo.includes("/admin")) {
      return redirect("/admin");
    }

    return redirect(redirectTo);
  }

  return encodedRedirect("error", "/sign-in", "Invalid login attempt");
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

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
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
