import React from 'react';
import './MainMenu.css'

class MenuItem extends React.Component {
    render() {
        return (
            <li className="menu-item">
                <a className="link-item" href={this.props.link}>{this.props.label}</a>
            </li>
        );
    }
}
export default MenuItem;