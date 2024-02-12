import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

const MyDatePicker = ({fieldName, onChange, errorMessage}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleChange = (date) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <label>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div className="input-block">
                <span className="field-name-span">{fieldName}</span>
                <DatePicker
                    className="input-field"
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd.MM.yyyy"
                    locale={ru}
                />
            </div>
        </label>
    );
};

export default MyDatePicker;