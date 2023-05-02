import React from 'react';
import "./calcButton.css";

const CalcButton = (props) => {

    const { textContent, value, children, action } = props;

    return (
        <button type="button" className="magenta-buttons" data-input-value={value} onClick={action}>
            {textContent}
        </button>
    )
}

export default CalcButton;