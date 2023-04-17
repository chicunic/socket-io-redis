const { Emitter } = require('@socket.io/redis-emitter');
const { createClient } = require('redis');

const redisClient = createClient({ url: 'redis://localhost:6379' });

const io = new Emitter(redisClient);

const emit = async (event, data) => {
  if (!redisClient.isOpen) await redisClient.connect();
  io.emit(event, data);
};

// emit('time', Date.now());
setInterval(() => {
  const time = Date.now();
  emit('time', time);
  console.log(`emitted time: ${time}`);
}, 5000);
