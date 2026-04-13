import { Emitter } from '@socket.io/redis-emitter';
import { createClient } from 'redis';

const redisClient = createClient({ url: 'redis://localhost:6379' });

const io = new Emitter(redisClient);

const emit = async (event: string, data: number) => {
  if (!redisClient.isOpen) await redisClient.connect();
  io.emit(event, data);
};

// emit('time', Date.now());
setInterval(() => {
  const time = Date.now();
  void emit('time', time);
  console.log(`emitted time: ${time}`);
}, 5000);
