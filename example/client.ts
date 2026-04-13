import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('socket.id', socket.id);
  socket.on('time', (time: number) => {
    console.log('time', time);
  });
});
