const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const io = new Server();

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  io.listen(3000);

  io.on('connection', (socket) => {
    console.log('[connected]', socket.id);
    socket.on('disconnect', () => {
      console.log('[disconnected]', socket.id);
    });
  });
  io.on('time', (time) => {
    console.log('time', time);
  });
});
