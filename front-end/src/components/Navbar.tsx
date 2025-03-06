"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-b-lg">
      {/* Logo */}
      <Logo />

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-gray-200 transition duration-300">
          Home
        </Link>
        <Link href="/marketplace" className="hover:text-gray-200 transition duration-300">
          Marketplace
        </Link>
      </div>

      {/* Clerk Authentication (User Avatar when Signed In, Login Button when Signed Out) */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
