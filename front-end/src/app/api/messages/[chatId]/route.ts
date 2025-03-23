import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Chat from "@/lib/models/Chat";

export async function GET(req: Request, context: { params: { chatId: string } }) {
    try {
        await connectToDatabase();

        const { chatId } = await context.params; // ✅ await this line

        const chat = await Chat.findOne({
            participants: { $all: [chatId] },
        });

        if (!chat) return NextResponse.json({ messages: [] });

        return NextResponse.json({ messages: chat.messages });
    } catch (err) {
        console.error("❌ Error fetching messages:", err);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
