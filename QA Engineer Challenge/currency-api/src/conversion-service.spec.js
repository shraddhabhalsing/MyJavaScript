const sut = require('./conversion-service');

jest.mock('./conversion-rate-catalog.json', () => ({
  base: 'USD',
  rates: {
    'USD': 1,
    'EUR': 0.906997,
    'YEN': 0.0092,
    'RON': 4.336
  }
}), { virtual: true });

describe('conversion-service', () => {
  let result;

  describe('when getCurrencies is called', () => {
    let expectedResult;

    beforeEach(() => {
      expectedResult = ['USD', 'EUR', 'YEN', 'RON'];
      result = sut.getCurrencies();
    });

    it('should return the list of currencies', () => {
      expect(result).toEqual(expectedResult);
    });
  });

  describe('when convert is called', () => {
    const testData = [
      { from: '', to: 'USD', value: 1, expectedResult: 0 },
      { from: 'EUR', to: '', value: 1, expectedResult: 0 },
      { from: 'EUR', to: 'USD', value: null, expectedResult: 0 },
      { from: 'USD', to: 'USD', value: 1, expectedResult: 1 },
      { from: 'EUR', to: 'USD', value: 1, expectedResult: 0.91 },
      { from: 'USD', to: 'EUR', value: 1, expectedResult: 0.91 },
      { from: 'EUR', to: 'YEN', value: 1, expectedResult: 0.01 },
      { from: 'EUR', to: 'RON', value: 1, expectedResult: 3.93 }
    ];

    testData.forEach(({ from, to, value, expectedResult }) => {
      describe(`with from='${from}', to='${to}' and value=${value}`, () => {
        beforeEach(() => {
          result = sut.convert({ from, to, value });
        });

        it(`should return ${expectedResult}`, () => {
          expect(result).toBe(expectedResult);
        });
      });
    });
  });

  describe('when isSupportedCurrency is called', () => {
    const testData = [
      { value: null, expectedResult: false },
      { value: 'X', expectedResult: false },
      { value: 'eur', expectedResult: false },
      { value: 'EUR', expectedResult: true }
    ];

    testData.forEach(({ value, expectedResult }) => {
      describe(`with value=${value}`, () => {
        beforeEach(() => {
          result = sut.isSupportedCurrency(value);
        });

        it(`should return ${expectedResult}`, () => {
          expect(result).toBe(expectedResult);
        });
      });
    });
  });

});
