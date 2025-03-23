// src/app/messenger/[chatId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSocket } from "@/lib/useSocket";

export default function ChatPage() {
  const { user } = useUser();
  const { chatId } = useParams(); // dynamic route param from URL
  const socketRef = useSocket();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Join the room
  useEffect(() => {
    if (socketRef.current && user?.id && chatId) {
      socketRef.current.emit("join_room", chatId); // room = sellerId
    }
  }, [socketRef.current, user?.id, chatId]);

  // Receive messages
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socketRef.current]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messagePayload = {
      content: newMessage,
      sender: user?.id,
      room: chatId,
    };

    socketRef.current?.emit("send_message", messagePayload);
    setMessages((prev) => [...prev, messagePayload]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${msg.sender === user?.id ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start"
              }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
