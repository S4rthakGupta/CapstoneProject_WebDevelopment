"use client";

import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function ProductDetailPage() {
  const { user, isLoaded } = useUser(); // ✅ Include isLoaded
  const { product } = useProduct();
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      router.push("/marketplace"); // Redirect if no product is selected
    }
  }, [product, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-800 dark:text-gray-200">Loading...</p>
      </div>
    );
  }

  const startChat = (sellerId: string) => {
    if (!isLoaded) {
      console.warn("🕒 Clerk is still loading...");
      return;
    }

    if (user?.id && sellerId) {
      const room = `${user.id}___${sellerId}`;
      router.push(`/messenger/${room}`);
    } else {
      console.error("❌ User or Seller ID is missing");
    }
  };

  return (
    <section className="w-full px-6 py-30 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Product Image */}
        <div className="lg:w-2/3 w-full flex justify-center items-start p-4">
          <div className="w-full max-w-2xl h-[500px] relative">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <aside className="lg:w-1/3 w-full p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            {product.title}
          </h1>
          <p className="font-semibold text-lg text-[#92DCE5] dark:text-[#92DCE5]">
            ${product.price}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-bold">Description: </span>
            {product.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              <span className="font-bold">Seller:</span> {product.username}
            </p>
            <p>
              <span className="font-bold">Location:</span> {product.location}
            </p>
            <p>
              <span className="font-bold">Condition:</span> {product.condition}
            </p>
            <p>
              <span className="font-bold">Category:</span> {product.category}
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="default"
              className="w-full bg-[#92DCE5] text-white hover:bg-[#6FBACD] dark:bg-[#6FBACD] dark:hover:bg-[#5CA9B5]"
              onClick={() => product.id && startChat(product.id)}
            >
              Chat with Seller
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
