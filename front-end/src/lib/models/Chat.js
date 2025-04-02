const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
    productId: String, // ✅ NEW
});


const chatSchema = new mongoose.Schema({
    participants: [String],
    messages: {
        type: [messageSchema],
        default: [],
    },
    productId: { type: String }, // ✅ ADD THIS
});


module.exports = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
