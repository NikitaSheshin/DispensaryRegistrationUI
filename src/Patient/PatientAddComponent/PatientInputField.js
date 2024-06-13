import React from 'react';

const AddPatientButton = ({ onChange, fieldName, errorMessage }) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div>
            <label>
                <div className="input-block">
                    <span className="field-name-span">{fieldName}</span>
                    <div>
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                        <input
                            placeholder="Введите значение"
                            className="input-field"
                            type="text"
                            onChange={handleChange}/>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default AddPatientButton;