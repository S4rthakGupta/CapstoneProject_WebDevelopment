"use client"; // Marking as a client-side component to use React hooks

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"; // Assuming you have ShadCN's Button component set up

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-b-lg">
      {/* Logo */}
      <Logo />

      {/* Hamburger Button */}
      <button
        className="md:hidden text-2xl transition-all duration-300 ease-in-out"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        &#9776;
      </button>

      {/* Navigation Links */}
      <div
        className={`md:flex space-x-6 ${isMenuOpen ? "block" : "hidden"} md:block transform md:transform-none transition-all duration-300 ease-in-out`}
      >
        <Link href="/" className="hover:text-gray-200 transition duration-300">
          Home
        </Link>
        <Link
          href="/marketplace"
          className="hover:text-gray-200 transition duration-300"
        >
          Marketplace
        </Link>
      </div>

      {/* Clerk Authentication (User Avatar when Signed In, Login Button when Signed Out) */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
              Login
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
