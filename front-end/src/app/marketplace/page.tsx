"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Marketplace() {
  const { user } = useUser();
  const router = useRouter();
  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);

  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchAds() {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Failed to fetch ads");
        const data = await res.json();
        setAds(data);
        setFilteredAds(data);
        console.log(data); // console.log the data to see what it looks like
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
      filtered = filtered.filter(
        (ad) =>
          (ad.location?.toLowerCase() || "").includes(location.toLowerCase()) // Ensure location is used here
      );
    if (searchQuery)
      filtered = filtered.filter(
        (ad) =>
          (ad.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) // Filter by title (name)
      );
    setFilteredAds(filtered);
  }, [ads, category, condition, location, searchQuery]);

  const startChat = (sellerId: string) => {
    if (sellerId) {
      router.push(`/messenger/${sellerId}`);
    } else {
      console.error("Seller ID is not defined!");
    }
  };


  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar with Filters */}
      <aside className="w-full lg:w-64 p-4 border-b lg:border-r bg-white">
        <h2 className="text-xl font-semibold mb-4">Marketplace</h2>
        <Input
          placeholder="Search Marketplace"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="w-full sm:w-auto">
            <label className="text-sm">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="text-sm">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">All Conditions</option>
              <option value="New">New</option>
              <option value="Used - Like New">Used - Like New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="text-sm">Location</label>
            <Input
              placeholder="Filter by Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <CreateAdDialog onAdCreated={() => window.location.reload()} />
      </aside>

      {/* Main Grid */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Today's Picks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAds.map((item) => (
            <Card
              key={item._id}
              className="flex flex-col border shadow-sm rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.name || "Product image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-grow justify-between">
                <h3 className="font-semibold text-lg mb-1 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
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
                    onClick={() => startChat(item.userId)}
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
  );
}
