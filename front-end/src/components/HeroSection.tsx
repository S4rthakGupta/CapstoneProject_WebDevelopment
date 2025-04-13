// components/HeroSection.tsx

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { isSignedIn, user } = useUser(); // Clerk's user authentication hook
  return (
    <section className="w-full px-6 py-30 bg-background text-foreground">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-5">
        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          {/* Conditional Rendering Based on Authentication */}
          {isSignedIn ? (
            <>
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-[#5BC9D7] dark:text-[#fff] mb-2"
              >
                Hello, {user?.firstName}! 🎉
              </motion.h3>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800">
                  REGISTER NOW!
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </>
          )}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-[#18206F] dark:text-[#fff]">
            Safe Deals for Students
          </h1>
          <p className="text-lg font-semibold text-muted-foreground mt-1 mb-6 max-w-md mx-auto md:mx-0">
            Powered by Students
          </p>

          <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto md:mx-0">
            A trusted marketplace where students can buy and sell items within a
            verified campus community.
          </p>
          {isSignedIn && (
            <Link href="/marketplace">
              <Button className="px-6 py-3 bg-[#18206F] text-white rounded-lg shadow-md hover:bg-[#15205a]">
                Get Started
              </Button>
            </Link>
          )}
        </div>

        {/* Illustration */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/images/image2.jpg"
            alt="Student marketplace illustration"
            width={400}
            height={400}
            className="dark:brightness-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
