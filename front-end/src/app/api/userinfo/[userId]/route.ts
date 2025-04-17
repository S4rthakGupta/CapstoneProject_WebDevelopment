import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const user = await clerkClient.users.getUser(params.userId);

        return NextResponse.json({
            email: user.emailAddresses[0]?.emailAddress || null,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        });
    } catch (err) {
        console.error("❌ Clerk user fetch failed:", err);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}
