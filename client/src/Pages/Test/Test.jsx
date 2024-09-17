import React, { useEffect, useState, useRef } from 'react';
import Spreadsheet from 'react-spreadsheet';
import socket from '../../helper/socket'; // Ensure this is pointing to your actual socket.io client

const Test = () => {
  const [data, setData] = useState([]);
  const [roomId, setRoomId] = useState('');
  const isLocalChange = useRef(false);

  useEffect(() => {
    const initializeRoom = async () => {
      if (!roomId) {
        const room = prompt('Enter Room ID:');
        if (room) {
          setRoomId(room);
          socket.emit('joinRoom', room);
        }
      }
    };

    initializeRoom();

    // Listen for spreadsheet data updates from other users
    socket.on('spreadsheetData', (initialData) => {
      if (Array.isArray(initialData)) {
        // Ensure that initialData is an array and properly formatted
        setData(initialData.map(row => (Array.isArray(row) ? row.map(cell => cell || { value: "" }) : [])));
      }
    });

    socket.on('cellUpdate', ({ row, col, value }) => {
      if (isLocalChange.current) return; // Avoid updating from local changes
      const newData = [...data];
      if (!newData[row]) {
        newData[row] = [];
      }
      newData[row][col] = { value };
      setData(newData);
    });

    socket.on('addRow', (newRow) => {
      if (Array.isArray(newRow)) {
        setData(prevData => [...prevData, newRow.map(cell => cell || { value: "" })]);
      }
    });

    socket.on('addCol', () => {
      setData(prevData => prevData.map(row => [...row, { value: "" }]));
    });

    return () => {
      socket.off('spreadsheetData');
      socket.off('cellUpdate');
      socket.off('addRow');
      socket.off('addCol');
      if (roomId) {
        socket.emit('leaveRoom', roomId);
      }
    };
  }, [roomId, data]);

  const handleDataChange = (newData) => {
    if (Array.isArray(newData)) {
      const updates = [];
      newData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell.value !== data[rowIndex]?.[colIndex]?.value) {
            updates.push({ row: rowIndex, col: colIndex, value: cell.value });
          }
        });
      });

      if (updates.length > 0) {
        isLocalChange.current = true;
        setData(newData);
        updates.forEach(update => {
          socket.emit('cellUpdate', { roomId, ...update });
        });
        isLocalChange.current = false;
      }
    } else {
      console.error('Received invalid data format', newData);
    }
  };

  const handleAddRow = () => {
    socket.emit('addRow', roomId);
  };

  const handleAddCol = () => {
    socket.emit('addCol', roomId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleAddCol}>Add Column</button>
      </div>
      <Spreadsheet data={data} onChange={handleDataChange} />
    </div>
  );
};

export default Test;
