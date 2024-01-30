import React from "react";
import './Header.css';

export default function Header( {doctorName, doctorSpecialty} ) {
    return (
        <div id="header">
            <h1>Диспансерный учет</h1>
            <div id="secondTitle">
                <h2>{doctorName}</h2>
                <h3>{doctorSpecialty}</h3>
            </div>
        </div>
    );
}
