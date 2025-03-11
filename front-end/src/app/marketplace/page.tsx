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
<<<<<<< Updated upstream
import ChatComponent from "@/components/ui/ChatComponent"; // Import the Chat Component
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99",
    image: "/images/headphones.webp",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image: "/images/smartwatch.webp",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$49",
    image: "/images/mouse.webp",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$129",
    image: "/images/keyboard.webp",
  },
];
=======
import ChatComponent from "@/components/ui/ChatComponent"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
>>>>>>> Stashed changes

export default function Marketplace() {
  const [ads, setAds] = useState<any[]>([]);
  const [filteredAds, setFilteredAds] = useState<any[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    async function fetchAds() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setAds(data);
      setFilteredAds(data); // Show all ads initially
    }
    fetchAds();
  }, []);
<<<<<<< Updated upstream
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Create Ad Button */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Find the Best Deals on Campus</h1>
        <p className="mt-2 text-lg">Buy, sell, or rent items with ease.</p>
        <div className="mt-6 max-w-md mx-auto">
          <Input
            placeholder="Search for items..."
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
                    layout="fill"
                    objectFit="cover"
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
                    Add to Cart
                  </Button>
                )}
              </CardFooter>
=======

  // Filter Ads by Category
  useEffect(() => {
    if (category === "All") {
      setFilteredAds(ads);
    } else {
      setFilteredAds(ads.filter((ad) => ad.category === category));
    }
  }, [category, ads]);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
        <CreateAdDialog onAdCreated={() => window.location.reload()} />

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label className="mr-2">Filter by Category:</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="p-2 border rounded"
          >
            <option value="All">All</option>
            <option value="Cars">Cars</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredAds.map((ad) => (
            <Card key={ad._id} className="shadow-lg border">
              <CardHeader>
                <CardTitle>{ad.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={ad.image} alt={ad.name} className="w-full h-40 object-cover mb-2 rounded-lg" />
                <p>{ad.description}</p>
                <p className="font-bold text-blue-700">${ad.price}</p>
                <p className="text-gray-500">{ad.category}</p>

                {/* Chat Button */}
                <Button
                  onClick={() => {
                    setChatOpen(true);
                    setSelectedUser(ad.seller || "Unknown Seller");
                  }}
                  className="mt-4 bg-green-600 text-white"
                >
                  Chat with Seller
                </Button>
              </CardContent>
>>>>>>> Stashed changes
            </Card>
          ))}
        </div>
      </div>
      {chatOpen && <ChatComponent sender="Buyer" receiver={selectedUser} />}
<<<<<<< Updated upstream

      {/* Footer */}
      <Footer />
    </div>
=======
      <Footer />
    </>
>>>>>>> Stashed changes
  );
}