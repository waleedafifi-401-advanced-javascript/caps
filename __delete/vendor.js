'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');
const storeName = process.env.STORE_NAME || 'Test Store by Waleed';

events.on('delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
});

module.exports = {
  start: function () {
    setInterval(() => {
      const fakeOrder = {
        store: storeName,
        orderID: faker.random.uuid(),
        customer: faker.fake('{{name.firstName}} {{name.lastName}}'),
        address: faker.address.streetAddress(),
      };
      events.emit('pickup', fakeOrder);
    }, 5000);
  },
};