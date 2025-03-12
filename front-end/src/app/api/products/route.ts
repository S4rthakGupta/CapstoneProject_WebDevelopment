import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Products";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return NextResponse.json(products);
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

  return NextResponse.json(newProduct, { status: 201 });
}
