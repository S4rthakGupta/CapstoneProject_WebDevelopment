"use client";
import ChatList from "@/components/ui/ChatList";

export default function MessagesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <ChatList />
    </div>
  );
}
