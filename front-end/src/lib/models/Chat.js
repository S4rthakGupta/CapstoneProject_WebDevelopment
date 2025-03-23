const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const chatSchema = new mongoose.Schema({
    participants: [String],
    messages: {
        type: [messageSchema],
        default: [],
    },
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
