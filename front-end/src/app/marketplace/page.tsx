"use client";
import { useEffect, useState } from "react";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatComponent from "@/components/ui/ChatComponent";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Marketplace() {
  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  // Filters
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Ads from DB
  useEffect(() => {
    async function fetchAds() {
      const res = await fetch("/api/ads");
      const data = await res.json();
      setAds(data);
    }
    fetchAds();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = [...ads];

    if (category) filtered = filtered.filter((ad) => ad.category === category);
    if (condition) filtered = filtered.filter((ad) => ad.condition === condition);
    if (location) filtered = filtered.filter((ad) =>
      (ad.location?.toLowerCase() || "").includes(location.toLowerCase())
    );
    if (searchQuery) filtered = filtered.filter((ad) =>
      (ad.name?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    );

    setFilteredAds(filtered);
  }, [ads, category, condition, location, searchQuery]);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Find the Best Deals on Campus</h1>
        <p className="mt-2 text-lg">Buy, sell, or rent items with ease.</p>
        <div className="mt-6 max-w-md mx-auto space-y-2">
          <Input
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white text-black"
          />
        </div>
        <div className="mt-4">
          <CreateAdDialog onAdCreated={() => window.location.reload()} />
        </div>
      </section>

      {/* Unified Product Grid (Listed Products + Ads) */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Available Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...products, ...ads].map((item) => (
            <Card
              key={item.id || item._id}
              className="shadow-lg border rounded-lg"
            >
              <CardHeader>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="w-full h-48 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-md"
                  />
                </div>
                {item.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}
                <p className="mt-2 font-bold text-blue-700">${item.price}</p>
              </CardContent>
              <CardFooter className="p-4">
                {item.seller ? (
                  <Button
                    onClick={() => {
                      setChatOpen(true);
                      setSelectedUser(item.seller || "Unknown Seller");
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Chat with Seller
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                    Save to Wishlist
                  </Button>
                )}
                
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Products</h2>

        {filteredAds.length === 0 ? (
          <p className="text-center text-gray-500">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAds.map((item) => (
              <Card key={item._id} className="shadow-lg border rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="w-full h-48 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                  {item.description && (
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  )}
                  <p className="mt-2 font-bold text-blue-700">${item.price}</p>
                  {item.location && (
                    <p className="mt-1 text-sm text-gray-500">📍 {item.location}</p>
                  )}
                </CardContent>
                <CardFooter className="p-4">
                  {item.seller ? (
                    <Button
                      onClick={() => {
                        setChatOpen(true);
                        setSelectedUser(item.seller || "Unknown Seller");
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Chat with Seller
                    </Button>
                  ) : (
                    <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                      Add to Cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Chat Component */}
      {chatOpen && <ChatComponent sender="Buyer" receiver={selectedUser} />}

      {/* Footer */}
      <Footer />
    </div>
  );
}
