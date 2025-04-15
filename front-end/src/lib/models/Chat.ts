import mongoose, { Schema, Document } from 'mongoose';

interface IMessage {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
  productId?: string; // ✅ Add this
}

interface IChat extends Document {
  participants: [string, string]; // [user1Id, user2Id]
  messages: IMessage[];
  productId?: string; // ✅ Add this line
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  productId: { type: String }, // ✅ Add this
});

const chatSchema = new Schema<IChat>({
  participants: { type: [String], required: true },
  messages: { type: [messageSchema], default: [] },
  productId: { type: String, required: false }, // ✅ Add this line
});

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);
