const conversionRateCatalog = require('./conversion-rate-catalog.json');

function getCurrencies () {
  return Object.keys(conversionRateCatalog.rates || []);
}

function isSupportedCurrency (currency) {
  return !!(conversionRateCatalog.rates || [])[currency];
}

function convert ({ from, to, value } = {}) {
  const rateSourceCurrency = conversionRateCatalog.rates[from] || 0;
  const rateDestinationCurrency = conversionRateCatalog.rates[to] || 0;

  const valueInBaseCurrency = value * rateSourceCurrency;
  const convertedValue = valueInBaseCurrency * rateDestinationCurrency;

  if (isNaN(convertedValue) || !isFinite(convertedValue)) {
    return 0;
  }

  return Number(convertedValue.toFixed(2));
}

module.exports = {
  getCurrencies,
  convert,
  isSupportedCurrency
};
