"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditAdDialog from "@/components/ui/EditAdDialog";
import Image from "next/image";

export default function SellerClient({ ads }: { ads: any[] }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState<any>(null);

  const handleEditClick = (ad: any) => {
    setSelectedAd(ad);
    setIsEditOpen(true);
  };

  return (
    <section className="w-full px-6 py-30 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        My Listings
      </h1>
      {ads.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ads.map((ad) => (
            <Card
              key={ad._id}
              className="flex flex-col justify-between h-[450px] border rounded-lg shadow-md overflow-hidden bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              <div className="relative w-full h-48">
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg truncate text-gray-800 dark:text-gray-200">
                  {ad.title}
                </h3>
                <p className="text-[#92DCE5] font-bold mt-2 dark:text-[#92DCE5]">
                  ${ad.price}
                </p>
                <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                  📍 {ad.location}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <Button
                    onClick={() => handleEditClick(ad)}
                    className="w-full bg-[#92DCE5] text-white hover:bg-[#6FBACD] dark:bg-[#6FBACD] dark:hover:bg-[#5CA9B5]"
                  >
                    Edit Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center">
          You have not posted any ads yet.
        </p>
      )}
      <EditAdDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        ad={selectedAd}
        onAdUpdated={() => window.location.reload()}
      />
    </section>
  );
}
