"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useSocket } from "@/lib/useSocket";

const MessengerPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const socketRef = useSocket();

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Get chatId from query param
  useEffect(() => {
    if (router.query.chatId) {
      setChatId(router.query.chatId as string);
    }
  }, [router.query.chatId]);

  // Join chat room
  useEffect(() => {
    if (socketRef.current && chatId) {
      socketRef.current.emit("join_room", chatId);
    }
  }, [socketRef.current, chatId]);

  // Listen for messages
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socketRef.current]);

  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

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
};

export default MessengerPage;
