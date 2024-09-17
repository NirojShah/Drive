import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000';

// Initialize socket connection with WebSocket transport only
const socket = io(SOCKET_SERVER_URL, {
  transports: ['websocket'], // Ensuring WebSocket is used as the transport
});

// Optional: Add additional configuration or listeners if needed

export default socket;
