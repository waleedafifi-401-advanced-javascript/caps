'use strict';

require('dotenv').config();
const net = require('net');
const faker = require('faker');
const client = new net.Socket();
const storeName = process.env.STORE_NAME || 'Cacti Store';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

client.connect(port, host, () => {});

client.on('data', (buffer) => {
    const orderEvent = JSON.parse(buffer.toString());
    if (orderEvent.event === 'delivered') {
        console.log(`VENDOR: Thank you for delivering ${orderEvent.payload.orderID}`);
    }
});

function start() {
    setInterval(() => {
        const fakeOrder = {
          store: storeName,
          orderID: faker.random.uuid(),
          customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
          address: faker.address.streetAddress(),
        };
        const event = JSON.stringify({
            event: 'pickup',
            time: new Date().toUTCString(),
            payload: fakeOrder
        });
        client.write(event);
      }, 5000);
}

start();