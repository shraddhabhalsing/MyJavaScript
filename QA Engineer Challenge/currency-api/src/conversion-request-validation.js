const conversionService = require('./conversion-service');

function validatePostCovertPayload ({ from, to, value } = {}) {
  const errors = [];

  if (!conversionService.isSupportedCurrency(from)) {
    errors.push(`'${from}' is not a supported currency.`);
  }

  if (!conversionService.isSupportedCurrency(to)) {
    errors.push(`'${to}' is not a supported currency.`);
  }

  if (typeof value !== 'number') {
    errors.push(`'${value}' is not a number.`);
  }

  return errors;
}

module.exports = {
  validatePostCovertPayload
};
