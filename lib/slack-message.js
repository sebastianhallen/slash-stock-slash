'use strict';

const querystring = require('querystring');

function withAttachments(text, attachments) {
  return {
    text: querystring.unescape(text),
    attachments: attachments.map(a => Object.assign(a, {
      text: unescape(a.text)
    }))
  };
}

function plain(text) {
  return {
    text: querystring.unescape(text)
  };
}

module.exports = {
  plain,
  withAttachments
};
