import React from 'react';
import InputMask from 'react-input-mask';

const MaskInputField = ({ onChange, fieldName, mask, placeholder, errorMessage  }) => {
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
                        <InputMask
                            mask={mask}
                            className="input-field"
                            onChange={handleChange}
                            placeholder={placeholder} />
                    </div>
                </div>
            </label>
        </div>
    );
};

export default MaskInputField;