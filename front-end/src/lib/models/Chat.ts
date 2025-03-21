import mongoose, { Schema, Document } from 'mongoose';

interface IMessage {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: Date;
}

interface IChat extends Document {
  participants: [string, string]; // [user1Id, user2Id]
  messages: IMessage[];
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new Schema<IChat>({
  participants: { type: [String], required: true },
  messages: { type: [messageSchema], default: [] },
});

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', chatSchema);
