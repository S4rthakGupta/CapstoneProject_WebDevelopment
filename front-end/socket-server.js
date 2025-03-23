require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const Chat = require("./src/lib/models/Chat");

const PORT = 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI, {
        dbName: "campus-synergy", // change if different
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`📦 ${socket.id} joined room ${room}`);
    });

    socket.on("send_message", async (data) => {
        const { room, content, sender } = data;
        const [userA, userB] = room.split("_");
        const receiver = sender === userA ? userB : userA;

        const message = {
            senderId: sender,
            receiverId: receiver,
            message: content,
            timestamp: new Date(),
        };

        try {
            let chat = await Chat.findOne({ participants: { $all: [userA, userB] } });

            if (!chat) {
                chat = new Chat({
                    participants: [userA, userB],
                    messages: [message],
                });
            } else {
                chat.messages.push(message);
            }

            await chat.save();

            io.to(room).emit("receive_message", {
                content,
                sender,
                timestamp: message.timestamp,
            });
        } catch (err) {
            console.error("❌ Error saving message:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ A user disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
