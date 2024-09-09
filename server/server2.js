// server.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { join } from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Serve static files from the public directory (if needed)
// app.use(static(join(__dirname, 'public')));

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle cursor updates from clients
  socket.on('cursor-update', (data) => {
    console.log('Cursor update received:', data);
    // Broadcast the cursor update to all other clients
    socket.broadcast.emit('cursor-update', data);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
