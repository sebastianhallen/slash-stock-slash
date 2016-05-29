'use strict';

function asPrice(amount, currency) {
  const prefixedCurrencies = [{
    name: 'USD',
    symbol: '$',
  }, {
    name: 'EUR',
    symbol: '€',
  }, {
    name: 'GBP',
    symbol: '£',
  }, {
    name: 'JPY',
    symbol: '¥',
  }];

  const prefix = prefixedCurrencies.filter(p => p.name === currency);
  if (prefix) {
    return `${prefix[0].symbol}${amount}`;
  }

  return `${amount}${currency}`;
}

function Quote(data) {
  this.price = asPrice(data.LastTradePriceOnly, data.Currency);
  this.change = asPrice(data.Change, data.Currency);
  this.changePercent = data.PercentChange;
  this.toString = () => `${data.Name} (${data.symbol}) ${this.price} Δ ${this.change}|${this.changePercent}`;
}

module.exports = Quote;
