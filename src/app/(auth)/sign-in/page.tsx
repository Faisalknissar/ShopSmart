"use client";

import { signInAction, requestOtpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const [message, setMessage] = useState<Message | null>(null);
  const [isOtpMode, setIsOtpMode] = useState(false);

  // Get search params on client side
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const messageType = searchParams.get("type");
    const messageText = searchParams.get("message");

    if (messageType && messageText) {
      setMessage({
        type: messageType as "error" | "success",
        message: messageText,
      });
    }
  }, []);

  const toggleOtpMode = () => {
    setIsOtpMode(!isOtpMode);
  };

  if (message && "message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium">
                  Email or Phone Number
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="you@example.com or +1234567890"
                  required
                  className="w-full"
                />
              </div>

              {!isOtpMode && (
                <div className="space-y-2" id="passwordField">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      className="text-xs text-muted-foreground hover:text-foreground hover:underline transition-all"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required={!isOtpMode}
                    className="w-full"
                  />
                </div>
              )}

              {isOtpMode && (
                <div className="space-y-2" id="otpField">
                  <Label htmlFor="otp" className="text-sm font-medium">
                    Verification Code
                  </Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter OTP sent to your phone"
                    className="w-full"
                    required={isOtpMode}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useOtp"
                  name="useOtp"
                  checked={isOtpMode}
                  onChange={toggleOtpMode}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="useOtp"
                  className="text-sm text-muted-foreground"
                >
                  Sign in with OTP instead of password
                </label>
              </div>
            </div>

            {!isOtpMode ? (
              <SubmitButton
                className="w-full"
                pendingText="Signing in..."
                formAction={signInAction}
              >
                Sign in
              </SubmitButton>
            ) : (
              <SubmitButton
                className="w-full"
                pendingText="Sending OTP..."
                formAction={requestOtpAction}
              >
                Request OTP
              </SubmitButton>
            )}

            {message && <FormMessage message={message} />}
          </form>
        </div>
      </div>
    </>
  );
}
