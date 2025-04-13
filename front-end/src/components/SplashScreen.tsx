// components/SplashScreen.tsx
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#18206F] dark:text-[#92DCE5]">
          Welcome to CampuSynergy 🎓
        </h1>
        <p className="text-muted-foreground text-lg">
          A safe student marketplace where you can buy, sell, and trade with verified campus peers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignUpButton mode="modal">
            <Button className="px-6 py-3 bg-[#18206F] text-white hover:bg-[#15205a]">Register Now</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button variant="outline">Login</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}
