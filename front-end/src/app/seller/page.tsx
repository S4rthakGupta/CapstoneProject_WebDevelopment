"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatComponent from "@/components/ui/ChatComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellerProfile() {
  const { sellerId } = useParams(); // Extracts the seller's ID from the URL
  const [ads, setAds] = useState([]);
  const [sellerInfo, setSellerInfo] = useState(null);

  useEffect(() => {
    async function fetchSellerData() {
      // Fetch seller's listings
      const res = await fetch(`/api/products?sellerId=${sellerId}`);
      const data = await res.json();
      setAds(data);

      // Fetch seller's information
      const sellerRes = await fetch(`/api/users/${sellerId}`);
      const sellerData = await sellerRes.json();
      setSellerInfo(sellerData);
    }

    fetchSellerData();
  }, [sellerId]);

  return (
    <div className="p-6">
      {sellerInfo && (
        <h1 className="text-2xl font-bold mb-4">Listings by {sellerInfo.name}</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {ads.map((ad) => (
          <Card key={ad._id}>
            <CardHeader>
              <CardTitle>{ad.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={ad.image} alt={ad.name} className="w-full h-40 object-cover mb-2" />
              <p>{ad.description}</p>
              <p className="font-bold">${ad.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Box */}
      <div className="mt-6">
        <ChatComponent sellerId={sellerId} />
      </div>
    </div>
  );
}
