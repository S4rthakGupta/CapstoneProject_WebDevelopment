import { Button } from "@/components/ui/button"; // ✅ Correct import

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to the Marketplace</h1>
      <p className="text-lg text-gray-600 mt-2">Find the best products here!</p>
      <div className="mt-6">
        <Button variant="default">Explore Marketplace</Button>
      </div>
    </main>
  );
}
