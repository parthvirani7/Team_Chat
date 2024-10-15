require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./db/db');
const socketio = require('socket.io');
const cors = require('cors');
const { saveMessage } = require('./services/chatService');
const chatSocket = require('./sockets/chatSocket');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
const server = http.createServer(app);
chatSocket(server);

const port = process.env.PORT || 5000;
app.use(cors());    
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Initialize Socket.IO for real-time chat

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const io = socketio(server, {
  cors: {
    origin: '*', 
  },
});

// When a new client connects to the chat
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a room
  socket.on('joinRoom', ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for incoming messages
  socket.on('chatMessage', async ({ roomId, user, message }) => {
    // Save the message in the database
    await saveMessage({ roomId, user, message });
    
    // Broadcast the message to others in the room
    io.to(roomId).emit('message', { user, message });
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
