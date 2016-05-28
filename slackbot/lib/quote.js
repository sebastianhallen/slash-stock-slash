'use strict';

function Quote(data) {
  return {
    toString: () => `${data.Name} (${data.symbol}) ${data.Ask} Δ ${data.Change}`,
  };
}

module.exports = Quote;
