"use client";
import { useEffect, useState } from "react";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import {
  Card,
  CardContent,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);

  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Products & Ads from DB
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
  useEffect(() => {
    async function fetchAds() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setAds(data);
      setFilteredAds(data);
      console.log("ADS:", ads);
    }

    async function fetchAds() {
      try {
        const res = await fetch("/api/ads");
        if (!res.ok) throw new Error("Failed to fetch ads");
        const data = await res.json();
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    }

    fetchProducts();
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
        (ad.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      );
    setFilteredAds(filtered);
  }, [ads, category, condition, location, searchQuery]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r bg-white">
        <h2 className="text-xl font-semibold mb-4">Marketplace</h2>
        <Input
          placeholder="Search Marketplace"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
        />
        <label className="text-sm">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 border rounded px-2 py-1"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Other">Other</option>
        </select>
        <label className="text-sm">Condition</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full mb-4 border rounded px-2 py-1"
        >
          <option value="">All Conditions</option>
          <option value="New">New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
        <label className="text-sm">Location</label>
        <Input
          placeholder="Filter by Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-4"
        />
        <CreateAdDialog onAdCreated={() => window.location.reload()} />
      </aside>

      {/* Main Grid */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Today's Picks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAds.map((item) => (
            <Card key={item._id} className="flex flex-col">
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={300}
                className="w-full h-40 object-cover rounded-t"
              />
              <CardContent className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-blue-700 font-bold mt-1">${item.price}</p>
                  {item.location && (
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href={`/products/${item._id}`}>
                    <Button variant="default" className="w-full">
                      View Product
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
