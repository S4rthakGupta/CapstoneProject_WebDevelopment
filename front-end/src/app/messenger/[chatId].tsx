"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSocket } from "@/lib/useSocket";

export default function ChatPage() {
  const { user } = useUser();
  const { chatId } = useParams(); // Getting chatId from the URL (dynamic route param)
  const socketRef = useSocket();

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Ensure room join logic
  useEffect(() => {
    if (socketRef.current && user?.id && chatId) {
      // Join the correct room (chatId is the unique identifier of the chat)
      socketRef.current.emit("join_room", chatId);
    }
  }, [socketRef.current, user?.id, chatId]);

  // Load previous messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetch(`/api/messages/${chatId}`);
        const data = await res.json();
        if (data?.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    if (chatId) loadMessages(); // Load messages when the chatId is available
  }, [chatId]);

  // Listen for incoming messages via socket
  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message"); // Cleanup socket event listener on unmount
    };
  }, [socketRef.current]);

  // Send a new message
  const sendMessage = () => {
    if (!newMessage.trim() || !chatId) return;

    const messagePayload = {
      content: newMessage,
      sender: user?.id,
      room: chatId,
    };

    socketRef.current?.emit("send_message", messagePayload); // Emit the message to the server
    setMessages((prev) => [...prev, messagePayload]); // Update the local state with the new message
    setNewMessage(""); // Reset the message input field
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-xs ${msg.senderId === user?.id
              ? "bg-blue-500 text-white self-end ml-auto"
              : "bg-gray-200 text-black self-start"
              }`}
          >
            {msg.message || msg.content}
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
