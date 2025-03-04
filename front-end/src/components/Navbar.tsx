"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-700">
        CampusSynergy
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
        <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link href="/marketplace" className="text-gray-700 hover:text-blue-500">Marketplace</Link>
      </div>

      {/* Clerk Authentication (User Avatar when Signed In, Login Button when Signed Out) */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-gray-700 hover:text-blue-500">Login</button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
