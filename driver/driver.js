'use strict';

const net = require('net');
require('dotenv').config();

const client = new net.Socket();
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

client.connect(port, host, () => {});

client.on('data', deliveredHandler);


function deliveredHandler(payload) {
  const orderObject = JSON.parse(payload.toString());
  if (orderObject.event === 'pickup') {
    setTimeout(() => {
      logAndCreate(orderObject, 'pickup', 'in transit');
    }, 1000);
    setTimeout(() => {
      logAndCreate(orderObject, 'delivered');
    }, 3000);
  }
}

function logAndCreate(orderObject, log, nextEvent){
  console.log(`${log} ${orderObject.payload.orderID}`);
  const event = JSON.stringify({
    event: nextEvent || log,
    time: new Date().toUTCString(),
    payload: orderObject.payload,
  });

  client.write(event);
}