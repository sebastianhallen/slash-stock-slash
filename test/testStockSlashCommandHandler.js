'use strict'

const handler = require('../stock-slash-command/handler');
const assert = require('chai').assert;

describe('stock-slash-command/handler', function() {
  this.timeout(15000);

  function invoke(ticker, done) {
    const context = {
      succeed: data => {
        assert(data.text !== 'Missing text!');
        done();
      },
      fail: error => done(error)
    };
    handler.handler({text: ticker}, context);
  }

  it('should get quote for ticker', done => invoke('AAPL', done));
});
