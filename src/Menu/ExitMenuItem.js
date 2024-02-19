import React, {useContext} from 'react';
import './MainMenu.css'
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../App";

const ExitMenuItem = ({link, label}) => {
    const {setToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleExit = () => {
        setToken('');
        navigate("/login");
    }

    return (
        <li className="menu-item">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="link-item" onClick={handleExit}>{label}</a>
        </li>
    );
}

export default ExitMenuItem;