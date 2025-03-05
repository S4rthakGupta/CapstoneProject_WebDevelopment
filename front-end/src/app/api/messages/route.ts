import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export async function GET(req: Request) {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("timestamp"));
  const querySnapshot = await getDocs(q);

  const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { sender, receiver, message } = await req.json();

  if (!sender || !receiver || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await addDoc(collection(db, "messages"), {
    sender,
    receiver,
    message,
    timestamp: new Date(),
  });

  return NextResponse.json({ success: true });
}
