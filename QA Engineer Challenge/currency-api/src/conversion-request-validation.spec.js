const sut = require('./conversion-request-validation');
const conversionService = require('./conversion-service');

describe('conversion-request-validation', () => {
  let payload;
  let result;
  let expectedResult;

  describe('when validatePostCovertPayload is called', () => {
    beforeEach(() => {
      jest.spyOn(conversionService, 'isSupportedCurrency');
    });

    describe('with invalid payload', () => {
      beforeEach(() => {
        payload = {
          from: 'X',
          to: 'Y',
          value: 'a'
        };
        expectedResult = [
          '\'X\' is not a supported currency.',
          '\'Y\' is not a supported currency.',
          '\'a\' is not a number.',
        ];

        jest
          .spyOn(conversionService, 'isSupportedCurrency')
          .mockImplementation(() => false);

        result = sut.validatePostCovertPayload(payload);
      });

      it('should return all validation errors', () => {
        expect(result).toEqual(expectedResult);
      });
    });

    describe('with valid payload', () => {
      beforeEach(() => {
        payload = {
          from: 'EUR',
          to: 'YEN',
          value: 5
        };
        expectedResult = [];

        jest
          .spyOn(conversionService, 'isSupportedCurrency')
          .mockImplementation(() => true);

        result = sut.validatePostCovertPayload(payload);
      });

      it('should return an empty array', () => {
        expect(result).toEqual(expectedResult);
      });
    });

  });

});
