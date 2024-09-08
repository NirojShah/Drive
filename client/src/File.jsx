import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const FileEditor = ({ fileId }) => {
  const [content, setContent] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join the room for real-time editing
    newSocket.emit('joinFileRoom', fileId);

    // Listen for updates from the server
    newSocket.on('fileUpdated', (newContent) => {
      setContent(newContent);
    });

    // Cleanup: disconnect on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [fileId]);  // This will re-run when fileId changes

  const handleEdit = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);

    // Send the updated content to the server
    if (socket) {
      socket.emit('editFile', { fileId, content: updatedContent });
    }
  };

  return (
    <textarea value={content} onChange={handleEdit}></textarea>
  );
};

export default FileEditor;
