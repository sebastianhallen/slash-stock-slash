'use strict';

const slackMessage = require('../lib/slack-message');
const yf = require('../lib/yahoo-finance');

module.exports.handler = function(event, context, cb) {
  const ticker = event.text;

  Promise.all([
    yf.quote(ticker)
      .then(quote => slackMessage.plain(quote.toString()))
      .then(message => context.succeed(message))
      .catch(error => context.fail(error))
  ]);
};
