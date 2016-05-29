'use strict';

import SlackBot from 'lambda-slack-router';
import yf from './lib/yahoo-finance';
const slackbot = new SlackBot({ token: process.env.SLACK_VERIFICATION_TOKEN });

slackbot.addCommand('ticker', ['ticker-name'], 'Get stock quote by ticker', (event, callback) => {
  const ticker = event.args['ticker-name'];

  yf.quote(ticker)
    .then(quote => ({
      text: quote.toString(),
      attachments: [{
        text: 'grap:',
        image_url: quote.chart,
      }],
    }))
    .then(message => callback(null, slackbot.inChannelResponse(message)))
    .catch(error => callback(error));
});

module.exports.handler = slackbot.buildRouter();
module.exports.slackbot = slackbot;
