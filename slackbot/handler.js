'use strict';

import SlackBot from 'lambda-slack-router';
import yf from './lib/yahoo-finance';
const slackbot = new SlackBot({ token: process.env.SLACK_VERIFICATION_TOKEN });

slackbot.addCommand('ticker', ['ticker-names...'], 'Get stock quote by ticker', (event, callback) => {
  const tickers = event.args['ticker-names'];

  yf.quote(tickers)
    .then(quotes => ({
      text: tickers.join(', '),
      attachments: quotes.map(quote => ({
        text: quote.toString(),
        image_url: quote.chart,
      })),
    }))
    .then(message => callback(null, slackbot.inChannelResponse(message)))
    .catch(error => callback(error));
});

module.exports.handler = slackbot.buildRouter();
module.exports.slackbot = slackbot;
