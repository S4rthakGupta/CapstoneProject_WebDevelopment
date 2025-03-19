// src/app/api/messages/route.ts
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID is required" }, { status: 400 });
  }

  const q = query(collection(db, "messages"), where("chatId", "==", chatId), orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(q);
  
  const messages = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.chatId || !body.senderId || !body.text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const docRef = await addDoc(collection(db, "messages"), {
    chatId: body.chatId,
    senderId: body.senderId,
    text: body.text,
    timestamp: new Date(),
  });

  return NextResponse.json({ id: docRef.id, ...body });
}
