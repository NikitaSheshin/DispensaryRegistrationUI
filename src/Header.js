import React from "react";
import './Header.css';
import {useLocation, useNavigate} from "react-router-dom";

export default function Header( {doctorName, doctorSpecialty, selectedMenuItem} ) {
    const location = useLocation();
    let userData = location.state && location.state.userData;

    const navigate = useNavigate();

    const toTemplateSearchPage = () => {
        navigate('/templateSearch', {state: {userData: userData}});
    }

    const toPatientSearchPage = () => {
        navigate('/patientSearch', {state: {userData: userData}});
    }

    const toInspectionSearchPage = () => {
        navigate('/inspectionSearch', {state: {userData: userData}});
    }

    const toReceptionDate = () => {
        navigate('/reception', {state: {userData: userData}});
    }

    return (
        <div id="header">
            <ul className="menu-container">
                <li className={`menu-item ${selectedMenuItem === 'reception' ? 'selected' : ''}`} onClick={() => {toReceptionDate()}}>Прием</li>
                <li className={`menu-item ${selectedMenuItem === 'templates' ? 'selected' : ''}`} onClick={() => {toTemplateSearchPage()}}>Шаблоны</li>
                <li className={`menu-item ${selectedMenuItem === 'inspections' ? 'selected' : ''}`} onClick={() => {toInspectionSearchPage()}}>Осмотры</li>
            </ul>


            <div id="secondTitle">
                <h2>{doctorName}</h2>
                <h3>{doctorSpecialty}</h3>
            </div>
        </div>
    );
}
