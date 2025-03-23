// src/app/api/chats/[userId]/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Chat from "@/lib/models/Chat";

export async function GET(
    _req: Request,
    context: { params: { userId: string } }
) {
    try {
        await connectToDatabase();
        const { userId } = context.params;

        const chats = await Chat.find({ participants: userId });

        return NextResponse.json({ chats });
    } catch (err) {
        console.error("Failed to load chats:", err);
        return NextResponse.json({ error: "Failed to load chats" }, { status: 500 });
    }
}
