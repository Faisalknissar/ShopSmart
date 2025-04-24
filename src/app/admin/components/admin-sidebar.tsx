"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../supabase/client";
import {
  Package,
  LayoutGrid,
  ShoppingBag,
  User,
  Tag,
  Star,
  FileText,
  BarChart3,
  LogOut,
  Home,
} from "lucide-react";

interface AdminSidebarProps {
  activePage?: string;
}

export default function AdminSidebar({ activePage }: AdminSidebarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    console.log("Admin sign out initiated");
    await supabase.auth.signOut();
    console.log("Sign out completed, redirecting to login page");
    // Use window.location for a hard redirect instead of router.push
    window.location.href = "/admin/login";
  };

  const navLinks = [
    {
      href: "/admin",
      label: "Products",
      icon: <Package size={18} />,
      id: "products",
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: <LayoutGrid size={18} />,
      id: "categories",
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: <ShoppingBag size={18} />,
      id: "orders",
    },
    {
      href: "/admin/customers",
      label: "Customers",
      icon: <User size={18} />,
      id: "customers",
    },
    {
      href: "/admin/inventory",
      label: "Inventory",
      icon: <Package size={18} />,
      id: "inventory",
    },
    {
      href: "/admin/discounts",
      label: "Discounts",
      icon: <Tag size={18} />,
      id: "discounts",
    },
    {
      href: "/admin/reviews",
      label: "Reviews",
      icon: <Star size={18} />,
      id: "reviews",
    },
    {
      href: "/admin/cms",
      label: "CMS Pages",
      icon: <FileText size={18} />,
      id: "cms",
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: <BarChart3 size={18} />,
      id: "analytics",
    },
  ];

  return (
    <div className="w-full md:w-64 bg-white shadow-md md:h-screen md:fixed">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      <nav className="p-4">
        <div className="mb-4">
          <Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home size={18} />
            <span>Back to Site</span>
          </Link>
        </div>

        <div className="space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`flex items-center gap-2 p-3 rounded-lg ${activePage === link.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100 transition-colors"}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
