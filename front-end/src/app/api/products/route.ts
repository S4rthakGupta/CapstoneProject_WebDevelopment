import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Products";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch products", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { title, description, price, image, category, condition, location } = await req.json();

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      category,
      condition,
      location,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create product", error }, { status: 500 });
  }
}
