'use strict';

import path from 'path';
import nock from 'nock';
import url from 'url';
import querystring from 'querystring';
import yf from '../slackbot/lib/yahoo-finance';

function tickerQuery(ticker) {
  const apiUrl = url.parse(yf.queryUri(ticker));
  const port = apiUrl.protocol === 'https:' ? ':443' : '';
  const uri = `${apiUrl.protocol}//${apiUrl.host}${port}`;
  const query = querystring.parse(apiUrl.query);

  nock.disableNetConnect();
  nock(uri, { encodedQueryParams: true })
    .get(apiUrl.pathname)
    .query(query)
    .replyWithFile(200, path.resolve(`./test/samples/${ticker}.json`));
}

module.exports.tickerQuery = tickerQuery;
