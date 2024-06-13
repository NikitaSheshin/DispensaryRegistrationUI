import React from "react";
import './MainMenu.css'
import ExitMenuItem from "./ExitMenuItem";
import {useNavigate} from "react-router-dom";

const MainMenu = ({userData}) => {
    const navigate = useNavigate();
    const toTemplateSearchPage = () => {
        navigate('/templateSearch', { state: { userData: userData } });
    }

    const toPatientSearchPage = () => {
        navigate('/patientSearch', { state: { userData: userData } });
    }

    const toInspectionSearchPage = () => {
        navigate('/inspectionSearch', { state: { userData: userData } });
    }

    return (
        <div className="menu-wrapper">
            <ul className="menu-container">
                <div className="menu-left">
                    <ul className="menu-container">
                        <li className="menu-item" onClick={toTemplateSearchPage}>Шаблоны</li>
                        <li className="menu-item" onClick={toPatientSearchPage}>Пациенты</li>
                        <li className="menu-item" onClick={toInspectionSearchPage}>Осмотры</li>
                        {/*<MenuItem link="/about" label="Пациенты" onClick={() => this.handleMenuItemClick("Пациенты")}/>*/}
                        {/*<MenuItem link="/contact" label="Осмотры" onClick={() => this.handleMenuItemClick("Осмотры")}/>*/}
                    </ul>
                </div>
                <ExitMenuItem link="/login" label="Выход"/>
            </ul>
        </div>
    );
}

export default MainMenu;