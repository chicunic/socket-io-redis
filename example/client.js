const { io } = require('socket.io-client');

const socket = io('ws://localhost:3000', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('socket.id', socket.id);
  socket.on('time', (time) => {
    console.log('time', time);
  });
});
