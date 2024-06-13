import React from "react";
import './InspectionDatePicker.css';
import MyDatePicker from "./InspectionDatePicker";
import icon from "../../resources/SearchIcon.png";
import './InspectionQueryString.css';

export default function InspectionQueryString({setFromDate, setToDate, search}) {
    return (
        <div className="inspection-search-item">
            <h1 className="header">Поиск</h1>

            <h1 className="header">С</h1>
            <MyDatePicker
                className="date-picker"
                onChange={setFromDate}/>

            <h1 className="header">По</h1>
            <MyDatePicker
                className="date-picker"
                onChange={setToDate}/>

            <img
                id="input-icon-2"
                src={icon}
                alt="Иконка поиска"
                onClick={search}
            />
        </div>
    );
}