import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
  await connectToDatabase();
  const users = await User.find();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { name, email, password } = await req.json();

  const newUser = new User({ name, email, password });
  await newUser.save();

  return NextResponse.json(newUser, { status: 201 });
}
