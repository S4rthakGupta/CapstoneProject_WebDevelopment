import { Server } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Chat from '../../models/Chat';

let io: Server;

// Socket handler
export default function socketHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!io) {
      io = new Server(res.socket.server);

      io.on('connection', (socket) => {
        console.log('A user connected');

        // Join a specific room based on userId
        socket.on('joinRoom', async (userId) => {
          console.log(`User ${userId} joined the chat room`);
          socket.join(userId);

          // Fetch existing messages for that user
          const chat = await Chat.find({ participants: { $in: [userId] } });
          if (chat.length > 0) {
            socket.emit('receiveMessages', chat[0].messages);
          }
        });

        // Handle sending new messages
        socket.on('sendMessage', async (data) => {
          const { senderId, receiverId, message } = data;

          // Store the new message in the database
          const chat = await Chat.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            {
              $push: { messages: { senderId, receiverId, message, timestamp: new Date() } },
            },
            { upsert: true, new: true }
          );

          // Broadcast the message to the receiver
          io.to(receiverId).emit('receiveMessage', data);
        });

        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      });
    }

    res.status(200).send('Socket server running');
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
