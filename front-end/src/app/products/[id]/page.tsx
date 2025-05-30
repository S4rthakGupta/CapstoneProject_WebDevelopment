import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // Fetch product data from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const product = await res.json();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 p-6">
      {/* Product Image */}
      <div className="lg:w-2/3 w-full flex justify-center items-start p-4">
        <div className="w-full max-w-2xl h-[500px] relative">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>

      {/* Product Details */}
      <aside className="lg:w-1/3 w-full p-6 bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-blue-700 font-semibold text-lg">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        <div className="text-sm text-gray-500">
          <p>
            <span className="font-medium">Location:</span> {product.location}
          </p>
          <p>
            <span className="font-medium">Condition:</span> {product.condition}
          </p>
          <p>
            <span className="font-medium">Category:</span> {product.category}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button variant="default">Add to Wishlist</Button>
          <Button variant="outline">Contact Seller</Button>
        </div>
      </aside>
    </div>
  );
}
