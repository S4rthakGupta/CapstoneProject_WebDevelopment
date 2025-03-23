import { NextResponse } from "next/server";
import Chat from "@/lib/models/Chat";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
    req: Request,
    context: { params: { userId: string } }
) {
    try {
        await connectToDatabase();

        const userId = context.params.userId;

        const chats = await Chat.find({ participants: userId });

        return NextResponse.json({ chats });
    } catch (err) {
        console.error("Failed to fetch chats:", err);
        return NextResponse.json({ error: "Failed to load chats" }, { status: 500 });
    }
}
