import { connectToDatabase } from "@/lib/mongodb";  // ✅ Correct named import
import { NextResponse } from "next/server";
import Product from "@/lib/models/Products";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const products = await Product.find().populate("seller");
    return res.json(products);
  }

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, description, price, image, category, condition, location } = await req.json();

  const newProduct = new Product({
    name,
    description,
    price,
    image,
    category,
    condition,
    location,
  }); await newProduct.save();
  if (req.method === "POST") {
    const { name, description, price, image, category } = req.body;
    const newProduct = new Product({ name, description, price, image, category });
    await newProduct.save();
    return res.status(201).json(newProduct);
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
