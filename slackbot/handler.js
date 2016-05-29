'use strict';

import SlackBot from 'lambda-slack-router';
import yf from './lib/yahoo-finance';
const slackbot = new SlackBot({ token: process.env.SLACK_VERIFICATION_TOKEN });

function lookupQuotes(tickers, range, callback) {
  yf.quote(tickers)
    .then(quotes => ({
      text: tickers.join(', '),
      attachments: quotes.map(quote => ({
        text: quote.toString(),
        image_url: quote.chart(range),
      })),
    }))
    .then(message => callback(null, slackbot.inChannelResponse(message)))
    .catch(error => callback(error));
}

slackbot.addCommand('ticker', ['ticker-names...'], 'Get stock quote by ticker', (event, callback) => {
  const tickers = event.args['ticker-names'];
  lookupQuotes(tickers, '1y', callback);
});

slackbot.addCommand('omx', [{ 'graph-range': '1y' }], 'Get OMX info', (event, callback) => {
  const range = event.args['graph-range'];

  lookupQuotes(['^OMX'], range, callback);
});

module.exports.handler = slackbot.buildRouter();
module.exports.slackbot = slackbot;
