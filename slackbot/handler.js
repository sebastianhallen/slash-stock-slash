'use strict';

import SlackBot from 'lambda-slack-router';
import yf from './lib/yahoo-finance';
const slackbot = new SlackBot({ token: process.env.SLACK_VERIFICATION_TOKEN });

slackbot.addCommand('ticker', ['ticker-name'], 'Get stock quote by ticker', (event, callback) => {
  const ticker = event.args['ticker-name'];

  yf.quote(ticker)
    .then(quote => quote.toString())
    .then(quote => callback(null, slackbot.inChannelResponse(quote)))
    .catch(error => callback(error));
});

module.exports.handler = slackbot.buildRouter();
module.exports.slackbot = slackbot;
