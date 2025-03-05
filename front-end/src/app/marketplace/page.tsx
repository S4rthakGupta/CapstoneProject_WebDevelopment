"use client";
import { useEffect, useState } from "react";
import CreateAdDialog from "@/components/ui/CreateAdDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ChatComponent from "@/components/ui/ChatComponent"; // Import the Chat Component

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
  );
}
