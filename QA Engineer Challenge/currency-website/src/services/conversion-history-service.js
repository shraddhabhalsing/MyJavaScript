import settings from '../settings';

const key = 'conversion-history';

function getConversions () {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : [];
}

function saveConversion ({ from, to, value, convertedValue } = {}) {
    const conversions = getConversions();
    conversions.unshift({ from, to, value, convertedValue, timestamp: new Date() });

    sessionStorage.setItem(key, JSON.stringify(conversions.slice(0, settings.maxConversionHistoryEntries)));
}

export default {
    getConversions,
    saveConversion
};
