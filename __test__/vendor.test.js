const vendor = require('../vendor');
const emitter = require('../events');

jest.useFakeTimers();

it('should receive delivery politely', () => {
  console.log = jest.fn();
  emitter.emit('delivered', { orderID : '4dfa2734-00b5-11eb-adc1-0242ac120002' });
  expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 4dfa2734-00b5-11eb-adc1-0242ac120002');
});

it('should emit order', () => {

  const callback = jest.fn();

  emitter.on('pickup', callback);

  expect(callback).not.toBeCalled();

  vendor.start();

  jest.runOnlyPendingTimers();

  // expect(callback).toBeCalledWith(expect.objectContaining({store:'Cacti Store'}));

  expect(callback).toHaveBeenCalledTimes(1);

});