import 'dotenv/config';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const { REDIS_URL, PORT = '8080' } = process.env;

const io = new Server();

const pubClient = createClient({ url: REDIS_URL });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()])
  .then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    io.listen(Number(PORT));
  })
  .catch(console.error);
