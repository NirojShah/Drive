import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow requests from any origin (for development, modify for production)
    methods: ['GET', 'POST']
  }
});

const rooms = {}; // Initialize rooms as an empty object

io.on('connection', (socket) => {
  console.log('A user connected');

  // Join a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    socket.emit('spreadsheetData', rooms[roomId]); // Send existing data to the new user
    console.log(`User joined room ${roomId}`);
  });

  // Leave a room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
  });

  // Handle cell updates
  socket.on('cellUpdate', ({ roomId, row, col, value }) => {
    if (rooms[roomId]) {
      if (!rooms[roomId][row]) {
        rooms[roomId][row] = [];
      }
      rooms[roomId][row][col] = { value };
      socket.to(roomId).emit('cellUpdate', { row, col, value }); // Broadcast to other users
    } else {
      console.error(`Room ${roomId} does not exist`);
    }
  });

  // Handle new row addition
  socket.on('addRow', (roomId) => {
    if (rooms[roomId]) {
      const newRow = Array((rooms[roomId][0] || []).length).fill({ value: "" });
      rooms[roomId].push(newRow);
      io.to(roomId).emit('addRow', newRow); // Broadcast to all users in the room
    } else {
      console.error(`Room ${roomId} does not exist`);
    }
  });

  // Handle new column addition
  socket.on('addCol', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].map(row => [...row, { value: "" }]);
      io.to(roomId).emit('addCol'); // Broadcast to all users in the room
    } else {
      console.error(`Room ${roomId} does not exist`);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5000, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Server started on port 5000");
});
