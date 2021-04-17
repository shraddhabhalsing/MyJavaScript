import sinon from 'sinon';
import 'jest-localstorage-mock';
import settings from '../settings';
import sut from './conversion-history-service';

describe('conversion-history-service', () => {
    let result;

    const key = 'conversion-history';
    const sandbox = sinon.createSandbox();
    const now = new Date("2020-01-01T00:00:00.000Z");

    beforeEach(() => {
        sessionStorage.clear();
        sandbox.useFakeTimers(now);
        sandbox.stub(settings, 'maxConversionHistoryEntries').value(2);
    });

    describe('when getConversions is called and the sessionStorage is empty', () => {
        beforeEach(() => {
            result = sut.getConversions();
        });

        it('should return an empty array', () => {
            expect(result).toEqual([]);
        });
    });

    describe('when getConversions is called and the sessionStorage has a value', () => {
        const storageValue =
            '[{"from":"USD","to":"EUR","value":5,"convertedValue":5.51,"timestamp":"2020-01-01T00:00:00.000Z"}]';

        const expectedResult = [{
            from: 'USD',
            to: 'EUR',
            value: 5,
            convertedValue: 5.51,
            timestamp: '2020-01-01T00:00:00.000Z'
        }];

        beforeEach(() => {
            sessionStorage.clear();
            sessionStorage.setItem(key, storageValue);
            result = sut.getConversions();
        });

        it('should return the value', () => {
            expect(result).toEqual(expectedResult);
        });
    });

    describe('when saveConversion is called for the first time', () => {
        const coversion = { from: 'USD', to: 'EUR', value: 5, convertedValue: 5.51 };

        const expectedStorageValue =
            "[{\"from\":\"USD\",\"to\":\"EUR\",\"value\":5,\"convertedValue\":5.51," +
            "\"timestamp\":\"2020-01-01T00:00:00.000Z\"}]";

        beforeEach(() => {
            sut.saveConversion(coversion);
        });

        it('should save the value in the session storage', () => {
            expect(sessionStorage.setItem).toBeCalledWith(key, expectedStorageValue);
        });
    });

    describe('when saveConversion is called and the \'maxConversionHistoryEntries\' value is exceeded', () => {
        const coversion1 = { from: 'USD', to: 'EUR', value: 5, convertedValue: 5.51 };
        const coversion2 = { from: 'EUR', to: 'YEN', value: 5, convertedValue: 492.93 };
        const coversion3 = { from: 'EUR', to: 'RON', value: 5, convertedValue: 1.05 };

        const expectedStorageValue =
            "[{\"from\":\"EUR\",\"to\":\"RON\",\"value\":5,\"convertedValue\":1.05," +
            "\"timestamp\":\"2020-01-01T00:00:00.000Z\"}," +
            "{\"from\":\"EUR\",\"to\":\"YEN\",\"value\":5,\"convertedValue\":492.93," +
            "\"timestamp\":\"2020-01-01T00:00:00.000Z\"}]";

        beforeEach(() => {
            sut.saveConversion(coversion1);
            sut.saveConversion(coversion2);
            sut.saveConversion(coversion3);
        });

        it('should save the value in the store', () => {
            expect(sessionStorage.setItem).toHaveBeenLastCalledWith(key, expectedStorageValue);
        });
    });
});
