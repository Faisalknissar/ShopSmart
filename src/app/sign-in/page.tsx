// This file is intentionally left empty to avoid routing conflicts
// The actual sign-in page is now in (auth)/sign-in/page.tsx

import { redirect } from "next/navigation";

export default function SignInRedirect() {
  redirect("/sign-in");
  return null;
}
