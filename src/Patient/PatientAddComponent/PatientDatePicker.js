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

            <div className="input-block">
                <span className="field-name-span">{fieldName}</span>
                <div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <DatePicker
                        className="input-field"
                        selected={selectedDate}
                        onChange={handleChange}
                        dateFormat="dd.MM.yyyy"
                        locale={ru}
                    />
                </div>
            </div>
        </label>
    );
};

export default MyDatePicker;