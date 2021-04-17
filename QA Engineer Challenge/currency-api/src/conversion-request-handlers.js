const conversionService = require('./conversion-service');
const conversionRequestValidation = require('./conversion-request-validation');

function handleGetCurrencies (req, res) {
  try {
    const currencies = conversionService.getCurrencies();
    res.send(currencies);
  } catch (error) {
    console.log('Error getting currencies', error);

    res.status(500).send('Can not provide currencies.');
  }
}

function handlePostConvert (req, res) {
  try {
    const payload = req.body;

    const errors = conversionRequestValidation.validatePostCovertPayload(payload);

    if (errors && errors.length) {
      res.status(400).send(errors);
      return;
    }

    const convertedValue = conversionService.convert(payload);

    res.send({ convertedValue });
  } catch (error) {
    console.log('Error converting value', error);

    res.status(500).send('Can not convert value.');
  }
}

module.exports = {
  handleGetCurrencies,
  handlePostConvert
};
