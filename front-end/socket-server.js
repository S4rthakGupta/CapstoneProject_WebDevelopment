require("dotenv").config({ path: ".env.local" });
const { Server } = require("socket.io");
const http = require("http");
const mongoose = require("mongoose");
const Chat = require("./src/lib/models/Chat");

const PORT = 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
    .connect(MONGODB_URI, {
        dbName: "campusynergy", // change if different
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

    // Join room - ensure room is correctly formed with userA_userB
    socket.on("join_room", (room) => {
        // Split room by underscore to extract userA and userB
        const [userA, userB] = room.split("___");
        console.log(`📦 ${socket.id} joining room ${room} (userA: ${userA}, userB: ${userB})`);
        socket.join(room);
    });

    socket.on("send_message", async (data) => {
        const { room, content, sender } = data;
        const [userA, userB] = room.split("___");  // Split room name to get user IDs (buyer and seller)
        const receiver = sender === userA ? userB : userA;

        const message = {
            senderId: sender,
            receiverId: receiver,
            message: content,
            timestamp: new Date(),
        };

        try {
            // Ensure we are saving messages between the correct pair of users
            let chat = await Chat.findOne({ participants: { $all: [userA, userB] } });

            if (!chat) {
                chat = new Chat({
                    participants: [userA, userB],
                    messages: [message],
                });
            } else {
                chat.messages.push(message);
            }

            await chat.save();  // Save message to the correct chat document

            // Emit message to the room
            io.to(room).emit("receive_message", {
                content,
                sender,
                timestamp: message.timestamp,
            });

            console.log("Message saved successfully between", userA, "and", userB);
        } catch (err) {
            console.error("❌ Error saving message:", err);
        }
    });


    // When the user disconnects
    socket.on("disconnect", () => {
        console.log("❌ A user disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
