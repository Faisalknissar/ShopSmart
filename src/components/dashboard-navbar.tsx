"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Home, Package, ShoppingBag, User, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../supabase/client";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/dashboard/orders",
      label: "My Orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopSmart
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1 text-sm font-medium ${pathname === link.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
