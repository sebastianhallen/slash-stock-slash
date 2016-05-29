'use strict';

const request = require('request-promise');
const querystring = require('querystring');
const Quote = require('./quote');
const env = 'store://datatables.org/alltableswithkeys';
const uri = 'https://query.yahooapis.com/v1/public/yql';

function queryUri(tickers) {
  const tickerArgs = tickers.map(ticker => `"${ticker}"`).join(',');
  const args = querystring.stringify({
    q: `select * from yahoo.finance.quotes where symbol in (${tickerArgs})`,
    format: 'json',
    env,
    callback: '',
  });

  return `${uri}?${args}`;
}

function quote(tickers) {
  return request({
    uri: queryUri(tickers),
    json: true,
  })
  .then(response => {
    if (response.query.count === 0) {
      return [];
    }

    if (response.query.count === 1) {
      return [response.query.results.quote];
    }

    return response.query.results.quote;
  })
  .then(quotes => quotes.map(q => new Quote(q)));
}

module.exports.queryUri = queryUri;
module.exports.quote = quote;
