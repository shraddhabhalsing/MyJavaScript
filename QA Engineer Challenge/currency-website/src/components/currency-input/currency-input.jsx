import React from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";

const CurrencyInput = ({ label, value, readonly, onChange }) => {
    const handleOnChange = event => {
        if (typeof onChange === 'function') {
            onChange(Number(event.target.value));
        }
    };

    return (
        <div className="CurrencyInput">
            <label className="CurrencyInput-label">{label}</label>
            <div className="CurrencyInput-input">
                <DebounceInput
                    minLength={1}
                    debounceTimeout={300}
                    onChange={handleOnChange}
                    disabled={readonly}
                    type={"number"}
                    value={value} />
            </div>
        </div>
    );
};

CurrencyInput.propTypes = {
    label: PropTypes.string,
    readonly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
};

export default CurrencyInput;
