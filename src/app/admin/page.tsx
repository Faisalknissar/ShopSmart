"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    // Redirect to admin dashboard immediately
    window.location.href = "/admin/login";
  }, []);

  return null; // No need to render anything as we're redirecting
}
