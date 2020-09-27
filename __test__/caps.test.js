'user strict';

jest.useFakeTimers();
const emitter = require('../events');
require('../caps');

const delivery = {
  store: 'Cacti store',
  orderID: '4dfa2734-00b5-11eb-adc1-0242ac120002',
  customer: 'Waleed A. Afifi',
  address: 'Gaza 10 Str.',
};

it('should log pickup', () => {

  console.log = jest.fn();

  emitter.emit('pickup', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT',
    expect.objectContaining({event:'pickup'}));

});

it('should log in-transit', () => {

  console.log = jest.fn();

  emitter.emit('in-transit', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event:'in-transit'}));

});

it('should log delivered', () => {

  console.log = jest.fn();

  emitter.emit('delivered', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event:'delivered'}));

});
