"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSocket } from "@/lib/useSocket";

export default function ChatPage() {
    const { user } = useUser();
    const { chatId } = useParams();
    const socketRef = useSocket();
    const searchParams = useSearchParams();

    const queryProductId = searchParams.get("product");
    const [productId, setProductId] = useState<string | null>(queryProductId);
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [productMap, setProductMap] = useState<Record<string, any>>({});

    // Join room
    useEffect(() => {
        if (socketRef.current && user?.id && chatId) {
            socketRef.current.emit("join_room", chatId);
        }
    }, [socketRef.current, user?.id, chatId]);

    // Load messages + fallback productId
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const res = await fetch(`/api/messages/${chatId}`);
                const data = await res.json();
                if (data?.messages) setMessages(data.messages);
                if (data?.productId && !productId) setProductId(data.productId);
            } catch (err) {
                console.error("❌ Failed to load messages:", err);
            }
        };

        if (chatId) loadMessages();
    }, [chatId]);

    // Load product info for messages
    useEffect(() => {
        const loadProductsForMessages = async () => {
            const productIds = [
                ...new Set(messages.map((m) => m.productId).filter(Boolean)),
            ];

            const productData: Record<string, any> = {};
            await Promise.all(
                productIds.map(async (id) => {
                    try {
                        const res = await fetch(`/api/ads/${id}`);
                        const data = await res.json();
                        productData[id] = data;
                    } catch (err) {
                        console.error(`Failed to load product ${id}`, err);
                    }
                })
            );

            setProductMap(productData);
        };

        if (messages.length > 0) {
            loadProductsForMessages();
        }
    }, [messages]);

    // Listen for new messages
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

    // Send message
    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const messagePayload = {
            content: newMessage,
            sender: user?.id,
            room: chatId,
            productId: productId, // send if available
        };

        socketRef.current?.emit("send_message", messagePayload);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-screen p-4">
            {/* 💬 Message List */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, i) => {
                    const linkedProduct = msg.productId ? productMap[msg.productId] : null;

                    const isFirstProductMention =
                        msg.productId &&
                        messages.findIndex(
                            (m) => m.productId === msg.productId && m.senderId === msg.senderId
                        ) === i;

                    return (
                        <div key={i} className="flex flex-col max-w-xs space-y-1">
                            {linkedProduct && isFirstProductMention && (
                                <div className="mb-1 p-2 border rounded bg-white shadow-sm text-xs text-gray-600 max-w-xs">
                                    <div className="flex gap-2">
                                        <img
                                            src={linkedProduct.image}
                                            alt={linkedProduct.title}
                                            className="w-12 h-12 object-cover rounded-md border"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm truncate">
                                                {linkedProduct.title}
                                            </span>
                                            <span className="text-blue-600 font-semibold">
                                                ${linkedProduct.price}
                                            </span>
                                            <span className="text-gray-500 line-clamp-2 text-xs">
                                                {linkedProduct.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div
                                className={`p-2 rounded-lg ${msg.senderId === user?.id
                                        ? "bg-blue-500 text-white self-end ml-auto"
                                        : "bg-gray-200 text-black self-start"
                                    }`}
                            >
                                {msg.message || msg.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ✏️ Input */}
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
