"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
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
export default function ListingsPreview() {
  const [listings, setListings] = useState<Ad[]>([]);
  const { setProduct } = useProduct(); // Move useProduct to the top level
  const router = useRouter();

  useEffect(() => {
    // Fetch random listings from the API
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/ads"); // Adjust the API endpoint as needed
        const data = await response.json();

        // Shuffle the data and select the first 4 items
        const shuffled = data.sort(() => 0.5 - Math.random());
        const randomListings = shuffled.slice(0, 4);

        setListings(randomListings);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleViewProduct = (product: Ad) => {
    setProduct({ ...product, id: product._id }); // Map _id to id for Product type
    console.log("Product ID:", product._id); // Debugging line
    console.log("Product:", product); // Debugging line

    router.push("/products"); // Navigate to the products page
  };

  return (
    <section id="listings" className="py-20 px-6 bg-muted/10 text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18206F]  dark:text-white">
            Explore Listings from Real Students
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Find deals on textbooks, tech, and more — all from your fellows.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-background border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-[#92DCE5] font-bold mt-2 dark:text-[#92DCE5]">
                  ${item.price}
                </p>
                {/* <Button className="mt-4 w-full bg-[#5BC9D7] text-white font-semibold hover:bg-[#82cade]">
                  View Listing
                </Button> */}

                <Button
                  className="mt-4 w-full font-semibold bg-[#82cade] text-white hover:bg-[#5BC9D7] dark:bg-[#6FBACD] dark:hover:bg-[#5CA9B5]"
                  onClick={() => handleViewProduct(item)}
                >
                  View Listing
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
