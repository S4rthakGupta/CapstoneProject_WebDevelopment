// export default function Footer() {
//   return (
//     <footer className="py-6 bg-white text-gray-600 shadow-md w-full border-t">
//       <div className="max-w-6xl mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

//           {/* About Section */}
//           <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-6">
//             <h3 className="text-lg font-semibold text-gray-800">CampusSynergy</h3>
//             <p className="mt-2 text-sm">
//               Secure buying, selling, and exchanging within verified communities.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:px-6">
//             <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
//             <ul className="mt-2 space-y-1">
//               <li>
//                 <a href="/" className="hover:text-blue-500 transition">Home</a>
//               </li>
//               <li>
//                 <a href="/marketplace" className="hover:text-blue-500 transition">Marketplace</a>
//               </li>
//             </ul>
//           </div>

//           {/* Social Media Links */}
//           <div className="md:pl-6">
//             <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
//             <div className="flex justify-center md:justify-start mt-3 space-x-4">
//               <a href="https://facebook.com" className="hover:text-blue-600 transition">
//                 Facebook
//               </a>
//               <a href="https://twitter.com" className="hover:text-blue-600 transition">
//                 Twitter
//               </a>
//               <a href="https://instagram.com" className="hover:text-blue-600 transition">
//                 Instagram
//               </a>
//             </div>
//           </div>

//         </div>

//         {/* Bottom Section */}
//         <div className="text-center border-t mt-6 pt-4 text-sm">
//           &copy; 2025 CampusSynergy | All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-center sm:text-left">
        {/* Column 1: Logo */}
        <div>
          <h2 className="text-2xl font-bold text-[#18206F] dark:text-[#92DCE5]">
            CampusSynergy
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Built by students, for students.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/marketplace" className="hover:underline">
            Marketplace
          </Link>
          <Link href="/my-listings" className="hover:underline">
            My Listings
          </Link>
          <Link href="#about-team" className="hover:underline">
            About Us
          </Link>
        </div>

        {/* Column 3: Socials & Copyright */}
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex gap-4 mb-3 justify-center sm:justify-end">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5 hover:text-[#18206F] dark:hover:text-[#92DCE5]" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5 hover:text-[#18206F] dark:hover:text-[#92DCE5]" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-5 h-5 hover:text-[#18206F] dark:hover:text-[#92DCE5]" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CampusSynergy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
