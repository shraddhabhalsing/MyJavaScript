import React from "react";
import PropTypes from "prop-types";

const CurrencyDropdown = ({ label, currencies, onChange }) => {
    const handleOnChange = event => {
        onChange(event.target.value);
    };

    return (
        <div className="CurrencyDropdown">
            <label className="CurrencyDropdown-label">{label}</label>
            <select onChange={handleOnChange}>
                <option key={'default'} value={''}>-</option>
                {currencies.map(value =>
                    <option key={value} value={value}>{value}</option>)}
            </select>
        </div>
    );
};

CurrencyDropdown.propTypes = {
    label: PropTypes.string.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func
};

export default CurrencyDropdown;
