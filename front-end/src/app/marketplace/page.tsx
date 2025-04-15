// Redesigned marketplace UI (dark/light mode & accessible, matching branding)

"use client";

import { useEffect, useState } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useProduct } from "@/context/ProductContext";
import { useRouter } from "next/navigation";

type Ad = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location?: string;
  category?: string;
  condition?: string;
  userId: string;
};

export default function Marketplace() {
  const {
    // user,
    isLoaded,
  } = useUser(); // ✅ Include isLoaded
  // const { toast } = useToast();

  const router = useRouter();
  const { setProduct } = useProduct(); // Move useProduct to the top level

  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Test");

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Failed to fetch ads");
        const data = await res.json();
        setAds(data);
        setFilteredAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    }
    fetchAds();
  }, []);

  useEffect(() => {
    let filtered = [...ads];
    if (category) filtered = filtered.filter((ad) => ad.category === category);
    if (condition)
      filtered = filtered.filter((ad) => ad.condition === condition);
    if (location)
      filtered = filtered.filter((ad) =>
        (ad.location?.toLowerCase() || "").includes(location.toLowerCase())
      );
    if (searchQuery)
      filtered = filtered.filter((ad) =>
        (ad.title?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
    setFilteredAds(filtered);
  }, [ads, category, condition, location, searchQuery]);

  const startChat = (sellerId: string, productId: string) => {
    if (!isLoaded) {
      console.warn("🕒 Clerk is still loading...");
      return;
    }

    if (user?.id && sellerId) {
      const room = [user.id, sellerId].sort().join("___");
      router.push(`/messenger/${room}?product=${productId}`); // ✅ FIXED: use productId
    } else {
      console.error("❌ User or Seller ID is missing");
    }
  };



  if (!isLoaded) return <div className="p-6 text-center">Loading user...</div>;

  const handleViewProduct = (product: Ad) => {
    setProduct({ ...product, id: product._id }); // Map _id to id for Product type

    router.push("/products"); // Navigate to the products page
  };

  return (
    <section className="w-full px-6 py-20 bg-background text-foreground">
      <div className="flex min-h-screen flex-col lg:flex-row bg-background text-foreground">
        <aside className="w-full lg:w-72 p-6 border-b lg:border-r bg-muted dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Marketplace
          </h2>
          <Input
            placeholder="Search Marketplace"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="">All Conditions</option>
                <option value="New">New</option>
                <option value="Used - Like New">Used - Like New</option>
                <option value="Used - Good">Used - Good</option>
                <option value="Used - Fair">Used - Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                Location
              </label>
              <Input
                placeholder="Filter by Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
          <div className="mt-6">
            <CreateAdDialog onAdCreated={() => window.location.reload()} />
          </div>
        </aside>

        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-bold mb-6">Today's Picks</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAds.map((item) => (
              <Card key={item._id} className="flex flex-col border shadow-sm rounded-lg overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title || "Product image"}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow justify-between">
                  <h3 className="font-semibold text-lg mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  <p className="text-blue-700 font-bold mt-1">${item.price}</p>
                  {item.location && (
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                  )}
                  <Link href={`/products/${item._id}`}>
                    <Button variant="default" className="w-full" disabled>
                      View Product
                    </Button>
                  </Link>
                  {item.userId && user?.id === item.userId ? (
                    <p className="text-gray-500 text-center text-sm mt-2">
                      You are the seller
                    </p>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full mt-2"
                      onClick={() => startChat(item.userId, item._id)}
                    >
                      Chat with Seller
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Today&apos;s Picks
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAds.map((item) => (
            <Card
              key={item._id}
              className="flex flex-col justify-between h-[450px] border rounded-lg shadow-md overflow-hidden bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title || "Product image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg truncate text-gray-800 dark:text-gray-200">
                  {item.title}
                </h3>
                <p className="text-[#92DCE5] font-bold mt-2 dark:text-[#92DCE5]">
                  ${item.price}
                </p>
                {item.location && (
                  <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                    📍 {item.location}
                  </p>
                )}
                <div className="mt-auto flex flex-col gap-2">
                  <Button
                    variant="default"
                    className="w-full bg-[#92DCE5] text-white hover:bg-[#6FBACD] dark:bg-[#6FBACD] dark:hover:bg-[#5CA9B5]"
                    onClick={() => handleViewProduct(item)}
                  >
                    View Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
    </section >
  );
}
