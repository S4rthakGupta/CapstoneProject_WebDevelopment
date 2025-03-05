import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageDialog } from "@/components/ui/MessageDialog";

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
}

export function ProductCard({ name, description, price, image, seller }: ProductCardProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-green-500 font-bold">${price}</span>
          <div className="flex gap-2">
            <MessageDialog recipientId={seller} />
            <Button variant="outline">Buy Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
