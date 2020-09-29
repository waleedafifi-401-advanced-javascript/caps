'use strict';

const vendor = require('../vendor/vendor');

describe('Vendor handler', () => {
  it('call start vendor handler', () => {
    let start = vendor.start;
    expect(start).toBeTruthy();
  });
});