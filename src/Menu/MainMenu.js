import React from "react";
import MenuItem from "./MenuItem";
import './MainMenu.css'
import ExitMenuItem from "./ExitMenuItem";

class MainMenu extends React.Component {
    render() {
        return (
            <div className="menu-wrapper">
                <ul className="menu-container">
                    <div className="menu-left">
                        <ul className="menu-container">
                            <MenuItem link="/home" label="Шаблоны"/>
                            <MenuItem link="/about" label="Пациенты"/>
                            <MenuItem link="/contact" label="Осмотры"/>

                        </ul>
                    </div>
                    <ExitMenuItem link="/login" label="Выход"/>
                </ul>
            </div>
        );
    }
}

export default MainMenu;