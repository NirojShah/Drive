// App.js
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill's CSS
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { QuillBinding } from 'y-quill';

const WEBSOCKET_URL = 'ws://localhost:1234';
const ROOM_ID = 'my-room-id';

// Function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const App = () => {
  const quillRef = useRef(null);
  const yDocRef = useRef(null);
  const providerRef = useRef(null);
  const [cursors, setCursors] = useState({}); // State to track cursors

  useEffect(() => {
    // Initialize Yjs document and provider
    const ydoc = new Y.Doc();
    yDocRef.current = ydoc;
    const provider = new WebsocketProvider(WEBSOCKET_URL, ROOM_ID, ydoc);
    providerRef.current = provider;

    // Initialize Quill editor
    const quill = new Quill(quillRef.current, {
      theme: 'snow',
      modules: {
        toolbar: true,
      },
    });

    // Set up Yjs binding with Quill
    const yText = ydoc.getText('quill');
    const binding = new QuillBinding(yText, quill, provider.awareness);

    // Handle awareness updates
    provider.awareness.on('update', () => {
      const awarenessStates = provider.awareness.getStates();
      const newCursors = {};
      for (const [clientId, state] of awarenessStates) {
        if (state.cursor) {
          newCursors[clientId] = {
            ...state.cursor,
            color: getRandomColor(), // Assign a random color
          };
        }
      }
      setCursors(newCursors);
    });

    // Clean up
    return () => {
      binding.destroy();
      provider.destroy();
    };
  }, []);

  // Render cursor elements
  const renderCursors = () => {
    const quillContainer = quillRef.current;
    if (!quillContainer) return null;

    const quillBounds = quillContainer.getBoundingClientRect();
    const cursorElements = Object.entries(cursors).map(([clientId, { left, top, color }]) => {
      const cursorElem = document.createElement('div');
      cursorElem.className = 'cursor';
      cursorElem.style.position = 'absolute';
      cursorElem.style.backgroundColor = color;
      cursorElem.style.width = '2px';
      cursorElem.style.height = '20px';
      cursorElem.style.left = `${left}px`;
      cursorElem.style.top = `${top}px`;
      cursorElem.style.zIndex = '1000';
      return (
        <div key={clientId} style={{ ...cursorElem.style }} />
      );
    });

    return cursorElements;
  };

  return (
    <div>
      <h1>Collaborative Quill Editor</h1>
      <div ref={quillRef} style={{ height: '400px', position: 'relative' }}>
        {renderCursors()}
      </div>
    </div>
  );
};

export default App;
