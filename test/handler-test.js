import { slackbot } from '../slackbot/handler';
import { assert } from 'chai';
import apiMock from './yahoo-api-mock';

describe('handler', function () {
  this.timeout(10000);

  function ticker(tickerName, check, done) {
    apiMock.tickerQuery(tickerName);
    slackbot.ticker({ args: { 'ticker-name': tickerName } }, (err, message) => {
      check(message);
      done();
    });
  }

  it('ticker', done => {
    ticker(['GOOG'], message => assert(message.text.length > 0), done);
  });
});
