import React, {useState} from 'react';
import InputMask from 'react-input-mask';

const MaskInput = ({ onChange, mask, placeholder, errorMessage, value }) => {
    const [inputValue, setInputValue] = useState(value);
    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e.target.value);
    };

    return (
        <label>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <InputMask
                mask={mask}
                className="input-data-field"
                onChange={handleChange}
                placeholder={placeholder}
                value={inputValue}
            />
        </label>
    );
}

export default MaskInput;