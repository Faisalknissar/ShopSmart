"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, User, ShoppingBag, Truck } from "lucide-react";
import UserProfile from "./user-profile";
import UserAuthDropdown from "./user-auth-dropdown";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";
import { usePathname } from "next/navigation";
import ProductDropdown from "./product-dropdown";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      // Use user-specific cookie context for the navbar
      const supabase = createClient({
        cookieOptions: { name: "sb-user-auth" },
      });
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { isDropdown: true, label: "PRODUCTS" },
    { href: "/testimonials", label: "TESTIMONIAL" },
    { href: "/contact", label: "CONTACT US" },
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
            {navLinks.map((link, index) =>
              link.isDropdown ? (
                <ProductDropdown key={index} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium ${pathname === link.href ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {!loading && <>{user ? <UserProfile /> : <UserAuthDropdown />}</>}

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
              {navLinks.map((link, index) =>
                link.isDropdown ? (
                  <div key={index} className="px-3 py-2">
                    <div className="font-medium mb-2">PRODUCTS</div>
                    <div className="pl-4 flex flex-col space-y-2">
                      <Link
                        href="/products?category=electronics"
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        Electronics
                      </Link>
                      <Link
                        href="/products?category=watches"
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        Watches
                      </Link>
                      <Link
                        href="/products?category=jewelry"
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        Jewelry
                      </Link>
                      <Link
                        href="/products?category=clothing"
                        className="text-sm text-gray-600 hover:text-blue-600"
                      >
                        Clothing
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium px-3 py-2 rounded-md ${pathname === link.href ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}

              {!user && (
                <div className="flex flex-col space-y-2 pt-2 border-t">
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" /> My Account
                  </Link>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
                  </Link>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Truck className="mr-2 h-4 w-4" /> Track Orders
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
