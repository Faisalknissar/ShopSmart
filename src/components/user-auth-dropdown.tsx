"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Truck,
  ShoppingBag,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserAuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-4 text-center">
          <h3 className="font-medium mb-2">Welcome to ShopSmart</h3>
          <Link href="/sign-in">
            <Button className="w-full mb-2" variant="default">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="w-full" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Create Account
            </Button>
          </Link>
        </div>

        <DropdownMenuSeparator />

        <div className="py-2">
          <h4 className="px-2 text-xs font-semibold text-muted-foreground mb-1">
            YOUR ACCOUNT
          </h4>
          <DropdownMenuItem asChild>
            <Link href="/(auth)/sign-in" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" /> My Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/(auth)/sign-in" className="cursor-pointer">
              <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/(auth)/sign-in" className="cursor-pointer">
              <Truck className="mr-2 h-4 w-4" /> Track Orders
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/(auth)/sign-in" className="cursor-pointer">
              <Package className="mr-2 h-4 w-4" /> My Wishlist
            </Link>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
