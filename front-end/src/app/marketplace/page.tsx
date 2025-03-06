"use client";
import { useEffect, useState } from "react";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatComponent from "@/components/ui/ChatComponent"; // Import the Chat Component

// export default function Marketplace() {
//   const [ads, setAds] = useState<any[]>([]);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState("");

//   useEffect(() => {
//     async function fetchAds() {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setAds(data);
//     }
//     fetchAds();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
//       <CreateAdDialog onAdCreated={() => window.location.reload()} />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {ads.map((ad) => (
//           <Card key={ad._id} className="shadow-lg border">
//             <CardHeader>
//               <CardTitle>{ad.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img src={ad.image} alt={ad.name} className="w-full h-40 object-cover mb-2 rounded-lg" />
//               <p>{ad.description}</p>
//               <p className="font-bold text-blue-700">${ad.price}</p>

//               {/* Chat Button */}
//               <Button
//                 onClick={() => {
//                   setChatOpen(true);
//                   setSelectedUser(ad.seller || "Unknown Seller");
//                 }}
//                 className="mt-4 bg-green-600 text-white"
//               >
//                 Chat with Seller
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Chat Component - Only visible when chatOpen is true */}
//       {chatOpen && <ChatComponent sender="Buyer" receiver={selectedUser} />}
//     </div>
//   );
// }



import { Input } from "@/components/ui/input";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function Marketplace() {
  const [ads, setAds] = useState<any[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function fetchAds() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setAds(data);
    }
    fetchAds();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
     <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Find the Best Deals on Campus</h1>
        <p className="mt-2 text-lg">Buy, sell, or rent items with ease.</p>
        <div className="mt-6 max-w-md mx-auto">
          <Input placeholder="Search for items..." className="bg-white text-black" />
        </div>
      </section>

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="shadow-lg">
              <CardContent className="p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                />
                <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* add dialog box */}
      <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
      <CreateAdDialog onAdCreated={() => window.location.reload()} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {ads.map((ad) => (
          <Card key={ad._id} className="shadow-lg border">
            <CardHeader>
              <CardTitle>{ad.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={ad.image} alt={ad.name} className="w-full h-40 object-cover mb-2 rounded-lg" />
              <p>{ad.description}</p>
              <p className="font-bold text-blue-700">${ad.price}</p>

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
          </Card>
        ))}
      </div>

      {/* Chat Component - Only visible when chatOpen is true */}
      {chatOpen && <ChatComponent sender="Buyer" receiver={selectedUser} />}
    </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
