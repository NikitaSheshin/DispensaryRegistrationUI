import React, {useState} from "react";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import './InspectionDatePicker.css';

const MyDatePicker = ({onChange}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleChange = (date) => {
        setSelectedDate(date);

        const formattedDate = date ? formatDate(date) : null;
        onChange(formattedDate);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
    };

    return (
            <div className="input-block">
                <DatePicker
                    className="input-field"
                    selected={selectedDate}
                    onChange={handleChange}
                    dateFormat="dd.MM.yyyy"
                    locale={ru}
                />
            </div>
    );
};

export default MyDatePicker;