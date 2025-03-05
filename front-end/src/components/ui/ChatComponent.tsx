"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Import Firebase Config
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";

export default function ChatComponent({ sender, receiver }: { sender: string; receiver: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!receiver) return;

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [receiver]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      sender,
      receiver,
      text: newMessage,
      timestamp: new Date(),
    });

    setNewMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <h3 className="font-bold text-lg mb-2">Chat with {receiver}</h3>
      <div className="h-40 overflow-y-auto border p-2 mb-2">
        {messages.map((msg) => (
          <p key={msg.id} className={msg.sender === sender ? "text-blue-600" : "text-gray-800"}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        className="w-full border p-2 rounded mb-2"
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button onClick={sendMessage} className="w-full bg-blue-600 text-white">
        Send
      </Button>
    </div>
  );
}
