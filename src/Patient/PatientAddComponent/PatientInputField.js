import React from 'react';

const AddPatientButton = ({ onChange, fieldName, errorMessage }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <label>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="input-block">
                <span className="field-name-span">{fieldName}</span>
                <input
                    placeholder="Введите значение"
                    className="input-field"
                    type="text"
                    onChange={handleChange}/>
            </div>
        </label>
    );
};

export default AddPatientButton;