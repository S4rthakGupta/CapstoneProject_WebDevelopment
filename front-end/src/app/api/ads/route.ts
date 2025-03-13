import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Ad } from '@/lib/models/Ads';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  await connectToDatabase();
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, description, price, image } = await req.json();

  const ad = new Ad({
    title,
    description,
    price,
    image,
    userId: user.id,
    username: user.fullName,
  });

  await ad.save();
  return NextResponse.json(ad, { status: 201 });
}

export async function GET() {
  await connectToDatabase();
  const ads = await Ad.find().sort({ createdAt: -1 });
  return NextResponse.json(ads);
}
