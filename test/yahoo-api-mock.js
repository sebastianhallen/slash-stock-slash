'use strict';

import fs from 'fs';
import path from 'path';
import nock from 'nock';
import url from 'url';
import querystring from 'querystring';
import yf from '../slackbot/lib/yahoo-finance';

function buildResponse(tickers) {
  return tickers
    .map(ticker => path.resolve(`./test/samples/${ticker}.json`))
    .map(file => fs.readFileSync(file))
    .map(raw => JSON.parse(raw))
    .reduce((prev, curr) => {
      const data = prev;

      ++data.query.count;
      data.query.results.quote.push(curr.query.results.quote);
      return data;
    },
    {
      query: {
        count: 0,
        results: {
          quote: [],
        },
      },
    });
}

function tickerQuery(tickers) {
  const apiUrl = url.parse(yf.queryUri(tickers));
  const port = apiUrl.protocol === 'https:' ? ':443' : '';
  const uri = `${apiUrl.protocol}//${apiUrl.host}${port}`;
  const query = querystring.parse(apiUrl.query);
  const response = buildResponse(tickers);

  nock.disableNetConnect();
  nock(uri, { encodedQueryParams: true })
    .get(apiUrl.pathname)
    .query(query)
    .reply(200, response);
}

module.exports.tickerQuery = tickerQuery;
