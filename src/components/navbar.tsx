"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, Menu } from "lucide-react";
import UserProfile from "./user-profile";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // In a real app, you would check if the user has admin role
      // For now, we'll just simulate this check
      if (user) {
        setIsAdmin(true); // This should be based on user role in a real app
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/testimonials", label: "Testimonials" },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ShopSmart
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${pathname === link.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    {isAdmin && (
                      <Link href="/admin">
                        <Button variant="outline" size="sm">
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Link href="/dashboard">
                      <Button variant="outline" size="sm">
                        Dashboard
                      </Button>
                    </Link>
                    <UserProfile />
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-4">
                    <Link
                      href="/sign-in"
                      className="text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      Sign In
                    </Link>
                    <Link href="/sign-up">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md ${pathname === link.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {!user && (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="text-sm font-medium px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
