"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface Chat {
  _id: string;
  participants: string[];
}

interface DisplayChat extends Chat {
  otherUserId: string;
  displayName: string;
}

export default function InboxPage() {
  const { user } = useUser();
  const [chats, setChats] = useState<DisplayChat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async (userId: string): Promise<string> => {
    try {
      const res = await fetch(`/api/userinfo/${userId}`);
      const data = await res.json();
      return data.email || data.name || userId;
    } catch (err) {
      console.warn("Failed to fetch user info:", err);
      return userId;
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(`/api/chats/${user.id}`);
        const data = await res.json();
        const rawChats: Chat[] = data.chats || [];

        // Enrich chats with display name
        const enrichedChats: DisplayChat[] = await Promise.all(
          rawChats.map(async (chat) => {
            const otherUserId = chat.participants.find((id) => id !== user.id)!;
            const displayName = await fetchUserInfo(otherUserId);
            return { ...chat, otherUserId, displayName };
          })
        );

        setChats(enrichedChats);
      } catch (err) {
        console.error("Failed to fetch inbox chats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      {loading ? (
        <p>Loading chats...</p>
      ) : chats.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-4">
          {chats.map((chat) => {
            const room = [user.id, chat.otherUserId].sort().join("___");
            return (
              <li key={chat._id}>
                <Link
                  href={`/messenger/${room}`}
                  className="block p-4 border rounded hover:bg-gray-100 transition"
                >
                  Chat with{" "}
                  <span className="font-semibold">{chat.displayName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
