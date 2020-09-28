'use strict';

require('dotenv').config();
const faker = require('faker');

const net = require('net');
const port = process.env.PORT || 3000;
const server = net.createServer();

server.listen(port, () => console.log(`Listening on port ${port}`));

const socketPool = {};

server.on('connection', (socket) => {
  const id = `socket-${faker.random.uuid()}`;
  socketPool[id] = socket;
  console.log('Socket Conected:', socket);

  socket.on('data', buffer => {
    const eventInfo = JSON.parse(buffer.toString());
    if(eventInfo.payload && eventInfo.event) {
      console.log('EVENT', eventInfo);
      broadcastEvent(eventInfo);
    }
  });

  socket.on('error', err => console.log('SOCKET ERROR', err));
  socket.on('end', end => delete socketPool[id]);
});

function broadcastEvent(eventInfo){
  const event = JSON.stringify(eventInfo);
  for(let socket in socketPool) {
    socketPool[socket].write(event);
  }
}

server.on('error', err => console.log('SERVER ERROR', err));