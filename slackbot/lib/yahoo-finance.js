'use strict';

const request = require('request-promise');
const querystring = require('querystring');
const Quote = require('./quote');

function quote(ticker) {
  const query = querystring.stringify({
    q: `select * from yahoo.finance.quotes where symbol in ("${ticker}")`,
    format: 'json',
    env: 'store://datatables.org/alltableswithkeys',
    callback: '',
  });
  const uri = `https://query.yahooapis.com/v1/public/yql?${query}`;

  return request({
    uri,
    json: true,
  })
  .then(response => new Quote(response.query.results.quote));
}

module.exports.quote = quote;
