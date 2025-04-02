import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Ad } from "@/lib/models/Ads";

export async function GET(req: Request, context: { params: { id: string } }) {
    await connectToDatabase();
    const { id } = context.params;

    try {
        const ad = await Ad.findById(id);
        if (!ad) {
            return NextResponse.json({ error: "Ad not found" }, { status: 404 });
        }
        return NextResponse.json(ad);
    } catch (err) {
        console.error("Failed to fetch ad:", err);
        return NextResponse.json({ error: "Failed to fetch ad" }, { status: 500 });
    }
}
