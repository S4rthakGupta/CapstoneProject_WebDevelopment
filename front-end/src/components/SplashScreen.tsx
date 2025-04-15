// components/SplashScreen.tsx
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SplashScreen() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-background overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/bg-campus.jpg')",
          filter: "brightness(0.9) blur(0.5px)", // subtle blur + dimming
        }}
      />

      {/* Foreground glassmorphism container */}
      <div className="relative z-10 bg-white/20 dark:bg-black/30 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">
          Welcome to CampuSynergy!
        </h1>

        <p className="text-white/90 text-lg drop-shadow-sm">
          A safe student marketplace where you can buy, sell, and trade with
          verified campus peers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignUpButton mode="modal">
            <Button className="px-6 py-3 bg-[#18206F] text-white hover:bg-[#15205a]">
              Register Now
            </Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button
              variant="secondary"
              className="bg-white text-[#18206F] hover:bg-gray-100"
            >
              Login
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
