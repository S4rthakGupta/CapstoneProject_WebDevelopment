const { Server } = require('socket.io');
const http = require('http');

const PORT = 4000;

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // your Next.js frontend
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('✅ A user connected:', socket.id);

    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`📦 ${socket.id} joined room ${room}`);
    });

    socket.on('send_message', (data) => {
        const { room, content, sender } = data;
        console.log(`📨 Message from ${sender} in ${room}: ${content}`);

        io.to(room).emit('receive_message', {
            content,
            sender,
            timestamp: new Date().toISOString(),
        });
    });

    socket.on('disconnect', () => {
        console.log('❌ A user disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Socket.IO server running on http://localhost:${PORT}`);
});
