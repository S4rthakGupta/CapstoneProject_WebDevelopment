"use client";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isPublicHomePage = pathname === "/";

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AccessibilityProvider>
              {/* Navbar Logic */}
              <SignedIn>
                <Navbar />
              </SignedIn>
              <SignedOut>{!isPublicHomePage && <Navbar />}</SignedOut>

              {/* Main content */}
              <main className="flex-grow">{children}</main>

              {/* FOOTER Logic */}
              <SignedIn>
                <Footer />
              </SignedIn>
              <SignedOut>{!isPublicHomePage && <Footer />}</SignedOut>
              {/* <Footer /> */}
            </AccessibilityProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
