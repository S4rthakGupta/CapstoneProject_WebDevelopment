"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { useUser } from "@clerk/nextjs";

let socket;

const MessengerPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  console.log("test command");
  
  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  useEffect(() => {
    if (!isClient) return; // Make sure the component is rendered on the client

    if (user) {
      socket = io("http://localhost:3000"); // Make sure this is your production URL

      // Join the room when the user opens the chat page
      if (user.id && chatId) {
        socket.emit("joinRoom", user.id);
      }

      // Listen for incoming messages
      socket.on("receiveMessage", (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user, chatId, isClient]);

  useEffect(() => {
    if (router.query.chatId) {
      setChatId(router.query.chatId as string); // Get chatId from the URL query
    }
  }, [router.query]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    // Send the message to the server via socket
    const messageData = {
      senderId: user?.id,
      receiverId: chatId,
      message: newMessage,
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage("");
  };

  if (!isClient) return null; // Ensure that the page is rendered only on the client-side

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.senderId === user?.id ? 'sent' : 'received'}`}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      <div className="p-4 flex space-x-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessengerPage;
