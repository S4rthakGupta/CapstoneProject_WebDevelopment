"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatComponentProps {
  chatId: string;
}

export default function ChatComponent({ chatId }: ChatComponentProps) {
  const { user } = useUser();
  const [messages, setMessages] = useState<{ id: string; senderId: string; text: string; timestamp: any }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "messages"),
      where("chatId", "==", chatId),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      chatId,
      senderId: user?.id,
      text: newMessage,
      timestamp: serverTimestamp(), // ✅ Ensures messages are ordered correctly
    });

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full p-4 border">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 ${msg.senderId === user?.id ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-1 rounded-lg ${msg.senderId === user?.id ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex mt-4">
        <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
        <Button onClick={sendMessage} className="ml-2">Send</Button>
      </div>
    </div>
  );
}
