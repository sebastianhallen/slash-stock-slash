'use strict';

const request = require('request-promise');
const querystring = require('querystring');
const Quote = require('./quote');

function quote(ticker) {
  const query = querystring.stringify({
    q: 'select * from yahoo.finance.quotes where symbol in ("' + ticker + '")',
    format: 'json',
    env: 'store://datatables.org/alltableswithkeys',
    callback: '',
  });
  const uri = 'https://query.yahooapis.com/v1/public/yql' + '?' + query
  console.log(uri);
  return request({
    uri,
    json: true
  })
  .then(response => new Quote(response.query.results.quote))
  .then(quote => console.log(quote.toString()))
  .catch(error => console.log(error));
}

Promise.all([quote('AAPL')]);