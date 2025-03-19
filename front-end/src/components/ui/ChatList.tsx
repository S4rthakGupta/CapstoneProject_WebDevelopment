"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ChatList() {
  const { user } = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (!user) return;
    async function fetchChats() {
      const res = await fetch(`/api/users/${user.id}/chats`);
      const data = await res.json();
      setChats(data);
    }
    fetchChats();
  }, [user]);

  if (!user) return <p>Please log in to view your messages.</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Chats</h2>
      {chats.length === 0 ? (
        <p>No chats available</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li key={chat.id} className="border p-2 rounded mb-2">
              <Link href={`/messages/${chat.id}`} className="text-blue-500">
                Chat with {chat.receiver}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
