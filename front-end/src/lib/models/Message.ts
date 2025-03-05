import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
