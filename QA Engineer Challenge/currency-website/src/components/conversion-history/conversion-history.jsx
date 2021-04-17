import React from "react";
import PropTypes from "prop-types";

const ConversionHistory = ({ conversions }) => {
    const composeHistoryEntry = ({ from, to, value, convertedValue, timestamp }) =>
        `${new Date(timestamp).toLocaleString()}: ${value} ${from} = ${convertedValue} ${to}`;

    return (
        <section className="ConversionHistory">
            <h4>Previous conversions: </h4>
            <ul className="ConversionHistory-list">
                {conversions.map(conversion =>
                    (<li key={conversion.timestamp} className="ConversionHistory-listItem">
                        {composeHistoryEntry(conversion)}
                    </li>))}
            </ul>
        </section>
    );
};

ConversionHistory.propTypes = {
    conversions: PropTypes.arrayOf(PropTypes.shape({
        from: PropTypes.string,
        to: PropTypes.string,
        value: PropTypes.number,
        convertedValue: PropTypes.number,
        timestamp: PropTypes.string
    })).isRequired
};

export default ConversionHistory;
