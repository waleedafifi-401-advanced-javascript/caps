'use strict';

const driver = require('../driver/driver');

jest.spyOn(global.console, 'log');

let order = {
  'customer': 'Waleeed',
  'storeName': 'Cacti Store',
  'address': '10 str',
  'orderID': 'asdasdz-asdasd-asdasd',
};

describe('driver handler', () => {
  it('call start driver handler', () => {
    let start = driver.onPickup(order);
    setTimeout(() => {
    expect(start).toHaveBeenCalled();
    }, 1500);
  });
});