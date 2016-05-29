import { slackbot } from '../slackbot/handler';
import { assert } from 'chai';
import apiMock from './yahoo-api-mock';

describe('handler', function () {
  this.timeout(10000);

  function ticker(tickerNames, check, done) {
    apiMock.tickerQuery(tickerNames);
    slackbot.ticker({ args: { 'ticker-names': tickerNames } }, (err, message) => {
      check(message);
      done();
    });
  }

  it('ticker GOOG', done => {
    ticker(['GOOG'], message => assert(message.text === 'GOOG'), done);
  });

  it('ticker SEB-A.ST', done => {
    ticker(['SEB-A.ST'], message => assert(message.text === 'SEB-A.ST'), done);
  });

  it('ticker GOOG SEB-A.ST', done => {
    ticker(['GOOG', 'SEB-A.ST'], message => assert(message.text === 'GOOG, SEB-A.ST'), done);
  });

  it('omx', done => {
    apiMock.tickerQuery(['^OMX']);
    slackbot.omx({ args: {} }, (err, message) => {
      if (err) { throw err; }
      assert(message.text === '^OMX', message.text);
      done();
    });
  });

  it('omx 6m', done => {
    apiMock.tickerQuery(['^OMX']);
    slackbot.omx({ args: { 'graph-range': '6m' } }, (err, message) => {
      const imageUrl = message.attachments[0].image_url;

      assert(imageUrl === 'http://chart.finance.yahoo.com/z?s=^OMX&t=6m&p=m50,m200');
      done();
    });
  });
});
