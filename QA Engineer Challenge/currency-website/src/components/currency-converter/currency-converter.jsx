import React, { useState, useEffect } from "react";
import currencyApiClient from "../../api-clients/currency-api-client";
import conversionHistoryService from "../../services/conversion-history-service";

import CurrencyInput from "../currency-input/currency-input";
import CurrencyDropdown from "../currency-dropdown/currency-dropdown";
import ConversionHistory from "../conversion-history/conversion-history";

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [state, setState] = useState({
        from: '',
        to: '',
        value: 0,
        convertedValue: 0,
        errorMessage: '',
        conversions: conversionHistoryService.getConversions()
    });

    const loadCurrencies = async () => {
        try {
            const result = await currencyApiClient.getCurrencies();
            setCurrencies(result);
        } catch (error) {
            setCurrencies([]);
        }
    };

    const convert = async () => {
        try {
            const payload = {
                from: state.from,
                to: state.to,
                value: Number(state.value)
            };
            const { convertedValue } = await currencyApiClient.convert(payload);
            setState({ ...state, ...{ convertedValue, errorMessage: '' } });
        } catch (error) {
            setState({ ...state, ...{ errorMessage: 'An error occured during conversion. Please try again later.' } });
        }
    };

    const handleInputChange = newState => {
        setState({ ...state, ...newState, ... { errorMessage: '', convertedValue: '' } });
    };
    const handleFromOnChange = from => handleInputChange({ from });
    const handleToOnChange = to => handleInputChange({ to });
    const handleValueOnChange = value => handleInputChange({ value });

    const handleButtonClick = async () => {
        if (!state.value || !state.from || !state.to) {
            return;
        }
        await convert();
    };

    useEffect(() => {
        loadCurrencies();
    }, []);

    useEffect(() => {
        if (state.convertedValue) {
            conversionHistoryService.saveConversion(state);
            const conversions = conversionHistoryService.getConversions();
            setState({ ...state, ...{ conversions } });
        }
    }, [state.convertedValue]);

    return (
        <section className="CurrencyConverter">
            <div className="CurrencyConverter-content">

                <div className="CurrencyConverter-inputs">
                    <div className="CurrencyConverter-item">
                        <CurrencyInput
                            label={'Convert'}
                            onChange={handleValueOnChange}
                        />
                    </div>

                    <div className="CurrencyConverter-item">
                        <CurrencyDropdown
                            label={'from'}
                            currencies={currencies}
                            onChange={handleFromOnChange}
                        />
                    </div>

                    <div className="CurrencyConverter-item">
                        <CurrencyDropdown
                            label={'to'}
                            currencies={currencies}
                            onChange={handleToOnChange}
                        />
                    </div>

                    <div className="CurrencyConverter-item">
                        <button
                            onClick={handleButtonClick}
                            className="CurrencyConverter-button">
                            =>
                        </button>
                    </div>

                    <div className="CurrencyConverter-item">
                        <CurrencyInput readonly value={state.convertedValue} />
                    </div>
                </div>

                <div className="CurrencyConverter-item">
                    {!!state.errorMessage &&
                        <span className="CurrencyConverter-errorMessage">{state.errorMessage}</span>}
                </div>
            </div>

            <div className="CurrencyConverter-history">
                <ConversionHistory conversions={state.conversions} />
            </div>
        </section>
    );
};

export default CurrencyConverter;
