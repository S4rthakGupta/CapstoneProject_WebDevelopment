// import { NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/mongodb";
// import { Ad } from "@/lib/models/Ads";
// import { currentUser } from "@clerk/nextjs/server";

// export async function POST(req: Request) {
//   await connectToDatabase();
//   const user = await currentUser();
//   if (!user)
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   // Extract fields from the request body
//   const { title, description, price, image, category, condition, location } =
//     await req.json();

//   // Check if all required fields are present
//   if (
//     !title ||
//     !description ||
//     !price ||
//     !category ||
//     !condition ||
//     !location
//   ) {
//     return NextResponse.json(
//       { error: "Missing required fields" },
//       { status: 400 }
//     );
//   }

//   // Create the new ad document
//   const ad = new Ad({
//     title,
//     description,
//     price,
//     image,
//     category,
//     condition,
//     location, // Ensure location is passed here
//     userId: user.id,
//     username: user.fullName,
//   });

//   // Save the ad to the database
//   await ad.save();
//   return NextResponse.json(ad, { status: 201 });
// }

// export async function GET() {
//   await connectToDatabase();
//   const ads = await Ad.find().sort({ createdAt: -1 });
//   return NextResponse.json(ads);
// }

// new code
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Ad } from "@/lib/models/Ads";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  await connectToDatabase();
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Extract fields from the request body
  const {
    _id,
    title,
    description,
    price,
    image,
    category,
    condition,
    location,
  } = await req.json();

  // Check if all required fields are present
  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !condition ||
    !location
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    if (_id) {
      // ✅ Update mode
      const updatedAd = await Ad.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          price,
          image,
          category,
          condition,
          location,
          userId: user.id,
          username: user.fullName,
        },
        { new: true }
      );

      if (!updatedAd) {
        return NextResponse.json({ error: "Ad not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Ad updated", ad: updatedAd });
    } else {
      // ✅ Create mode
      const ad = new Ad({
        title,
        description,
        price,
        image,
        category,
        condition,
        location,
        userId: user.id,
        username: user.fullName,
        createdAt: new Date(),
      });

      await ad.save();
      return NextResponse.json(ad, { status: 201 });
    }
  } catch (err) {
    console.error("Ad create/update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  const ads = await Ad.find().sort({ createdAt: -1 });
  return NextResponse.json(ads);
}
