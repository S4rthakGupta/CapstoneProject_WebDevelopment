"use client"; // Marking as a client-side component to use React hooks

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/AccessibilityContext"; // ⬅️ Import accessibility hook

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleFontSize, toggleContrast } = useAccessibility(); // ⬅️ Use accessibility context

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-b-lg">
      {/* Logo */}
      <Logo />

      {/* Hamburger + Mobile Auth */}
      <div className="flex items-center space-x-4 md:space-x-0">
        <button
          className="md:hidden text-2xl transition-all duration-300 ease-in-out"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          &#9776;
        </button>

        <div className="md:hidden">
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
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute top-16 left-0 w-full bg-blue-700 md:static md:flex md:space-x-6 md:bg-transparent ${
          isMenuOpen ? "block" : "hidden"
        } md:block transform md:transform-none transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-4 md:ml-auto">
          <Link href="/" className="hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link href="/marketplace" className="hover:text-gray-200 transition duration-300">
            Marketplace
          </Link>
          <Link href="/messenger" className="hover:underline">
            Inbox
          </Link>
          <Link href="/seller" className="hover:text-gray-200 transition duration-300">
            My Listings
          </Link>
        </div>
      </div>

      {/* Right side: Auth + Accessibility */}
      <div className="hidden md:flex items-center space-x-4">
        {/* Accessibility Buttons */}
        <button
          onClick={toggleFontSize}
          className="text-sm bg-white text-blue-700 px-2 py-1 rounded hover:bg-gray-100 transition"
          title="Toggle Font Size"
        >
          A+/A-
        </button>

        <button
          onClick={toggleContrast}
          className="text-sm bg-white text-blue-700 px-2 py-1 rounded hover:bg-gray-100 transition"
          title="Toggle High Contrast"
        >
          🌗
        </button>

        {/* Clerk Auth */}
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
