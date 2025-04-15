// "use client"; // Marking as a client-side component to use React hooks

// import { useState } from "react";
// import Link from "next/link";
// import Logo from "@/components/Logo";
// import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";
// import { useAccessibility } from "@/context/AccessibilityContext"; // ⬅️ Import accessibility hook

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { toggleFontSize, toggleContrast } = useAccessibility(); // ⬅️ Use accessibility context

//   return (
//     <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-b-lg">
//       {/* Logo */}
//       <Logo />

//       {/* Hamburger + Mobile Auth */}
//       <div className="flex items-center space-x-4 md:space-x-0">
//         <button
//           className="md:hidden text-2xl transition-all duration-300 ease-in-out"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           &#9776;
//         </button>

//         <div className="md:hidden">
//           <SignedOut>
//             <SignInButton mode="modal">
//               <Button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
//                 Login
//               </Button>
//             </SignInButton>
//           </SignedOut>

//           <SignedIn>
//             <UserButton afterSignOutUrl="/" />
//           </SignedIn>
//         </div>
//       </div>

//       {/* Navigation Links */}
//       <div
//         className={`absolute top-16 left-0 w-full bg-blue-700 md:static md:flex md:space-x-6 md:bg-transparent ${
//           isMenuOpen ? "block" : "hidden"
//         } md:block transform md:transform-none transition-all duration-300 ease-in-out`}
//       >
//         <div className="flex flex-col md:flex-row md:items-center md:justify-end space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-4 md:ml-auto">
//           <Link href="/" className="hover:text-gray-200 transition duration-300">
//             Home
//           </Link>
//           <Link href="/marketplace" className="hover:text-gray-200 transition duration-300">
//             Marketplace
//           </Link>
//           <Link href="/messenger" className="hover:underline">
//             Inbox
//           </Link>
//           <Link href="/seller" className="hover:text-gray-200 transition duration-300">
//             My Listings
//           </Link>
//         </div>
//       </div>

//       {/* Right side: Auth + Accessibility */}
//       <div className="hidden md:flex items-center space-x-4">
//         {/* Accessibility Buttons */}
//         <button
//           onClick={toggleFontSize}
//           className="text-sm bg-white text-blue-700 px-2 py-1 rounded hover:bg-gray-100 transition"
//           title="Toggle Font Size"
//         >
//           A+/A-
//         </button>

//         <button
//           onClick={toggleContrast}
//           className="text-sm bg-white text-blue-700 px-2 py-1 rounded hover:bg-gray-100 transition"
//           title="Toggle High Contrast"
//         >
//           🌗
//         </button>

//         {/* Clerk Auth */}
//         <SignedOut>
//           <SignInButton mode="modal">
//             <Button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition">
//               Login
//             </Button>
//           </SignInButton>
//         </SignedOut>

//         <SignedIn>
//           <UserButton afterSignOutUrl="/" />
//         </SignedIn>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { FaEnvelope } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = (href: string) =>
    `transition-colors text-right ${
      pathname === href
        ? "text-[#18206F] dark:text-[#92DCE5] font-semibold"
        : "hover:text-[#18206F] dark:hover:text-[#92DCE5]"
    }`;

  return (
    <header className="w-full fixed top-0 z-50 border-b border-border backdrop-blur-md bg-background/70 text-foreground">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        {/* LEFT: Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight text-[#18206F] dark:text-[#92DCE5]"
            onClick={closeMenu}
          >
            <Logo />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* CENTER: Navigation + Toggles */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 right-0 w-full bg-background md:static md:flex md:items-center md:justify-center md:w-auto md:bg-transparent`}
        >
          <div className="flex flex-col md:flex-row md:gap-6 text-sm font-medium md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-6 pr-4">
            <Link href="/" onClick={closeMenu} className={navLinkClass("/")}>
              Home
            </Link>
            <Link
              href="/marketplace"
              onClick={closeMenu}
              className={navLinkClass("/marketplace")}
            >
              Marketplace
            </Link>
            <Link
              href="/seller"
              onClick={closeMenu}
              className={navLinkClass("/seller")}
            >
              My Listings
            </Link>

            <Link
              href="/messenger"
              aria-label="Inbox"
              onClick={closeMenu}
              className="text-right pr-4"
            >
              <FaEnvelope className="w-5 h-5 ml-auto hover:text-[#18206F] dark:hover:text-[#92DCE5]" />
            </Link>

            <div className="text-right pr-2">
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* RIGHT: Clerk Auth */}
        <div className="hidden md:flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button
                size="sm"
                className="bg-[#18206F] text-white hover:bg-[#15205a]"
              >
                Register
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}

// hamburger menu for mobile view
