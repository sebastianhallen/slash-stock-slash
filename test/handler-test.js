import { slackbot } from '../slackbot/handler';
import { assert } from 'chai';

describe('handler', function () {
  this.timeout(10000);

  function ticker(tickers, check, done) {
    slackbot.ticker({ args: { ticker: tickers } }, (err, message) => {
      check(message);
      done();
    });
  }

  it('ticker', done => {
    ticker(['GOOG'], message => assert(message.text.length > 0), done);
  });
});
