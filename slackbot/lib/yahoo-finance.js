'use strict';

const request = require('request-promise');
const querystring = require('querystring');
const Quote = require('./quote');
const env = 'store://datatables.org/alltableswithkeys';
const uri = 'https://query.yahooapis.com/v1/public/yql';

function queryUri(ticker) {
  const args = querystring.stringify({
    q: `select * from yahoo.finance.quotes where symbol in ("${ticker}")`,
    format: 'json',
    env,
    callback: '',
  });

  return `${uri}?${args}`;
}

function quote(ticker) {
  return request({
    uri: queryUri(ticker),
    json: true,
  })
  .then(response => new Quote(response.query.results.quote));
}

module.exports.queryUri = queryUri;
module.exports.quote = quote;
