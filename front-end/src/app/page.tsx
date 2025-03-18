"use client";

import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isSignedIn, user } = useUser(); // Clerk's user authentication hook

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 py-16">
        <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">
              CampuSynergy <br />
              <span className="text-blue-600">SAFE DEALS FOR STUDENTS!</span>
            </h2>
            <p className="text-gray-600">
              Welcome to <span className="font-bold text-blue-700">CampusSynergy</span>, the ultimate safe marketplace designed exclusively for students. Here, you can buy, sell, and exchange items within a trusted community where every user is verified through their student ID.
            </p>
            <p className="text-gray-600">
              Whether you’re looking for textbooks, dorm essentials, or unique finds, <span className="font-bold text-blue-700">CampusSynergy</span> is your one-stop shop for all your campus needs. Join today and experience a marketplace built for students, by students.
            </p>

            {/* Conditional Rendering Based on Authentication */}
            <div className="space-x-4">
              {isSignedIn ? (
                <>
                  <p className="text-lg font-semibold text-blue-700">
                    Hello, {user?.firstName}! 🎉
                  </p>
                  <SignOutButton>
                    <Button variant="outline">Logout</Button>
                  </SignOutButton>
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
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/placeholder.jpg"
              alt="CampusSynergy"
              className="w-80 h-80 rounded-full object-cover shadow-lg"
              style={{
                animation: "bounceSlow 2s ease-in-out infinite",
              }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}