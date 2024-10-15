const socketio = require('socket.io');
const Message = require('../models/chatModel');

const chatSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on('chatMessage', async ({ roomId, message }) => {
      const newMessage = await Message.create({ roomId, message });
      io.to(roomId).emit('message', newMessage);
    });
  });
};

module.exports = chatSocket;
