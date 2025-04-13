"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

const listings = [
  {
    id: 1,
    title: "RGB Gaming Keyboard",
    price: "$150",
    image: "/images/keyboard.webp",
  },
  {
    id: 2,
    title: "RGB Gaming Mouse",
    price: "$35",
    image: "/images/mouse.webp",
  },
  {
    id: 3,
    title: "Gen 4 Smartwatch",
    price: "$45",
    image: "/images/smartwatch.webp",
  },
  {
    id: 4,
    title: "Wireless Headphones",
    price: "$60",
    image: "/images/headphones.webp",
  },
];

export default function ListingsPreview() {
  return (
    <section id="listings" className="py-20 px-6 bg-muted/10 text-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18206F] dark:text-[#92DCE5]">
            Explore Listings from Real Students
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Find deals on textbooks, tech, and more — all from your fellow
            classmates.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((item) => (
            <div
              key={item.id}
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
                <p className="text-sm text-muted-foreground">{item.price}</p>
                <Button className="mt-4 w-full bg-[#5BC9D7] text-white font-semibold hover:bg-[#82cade]">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
