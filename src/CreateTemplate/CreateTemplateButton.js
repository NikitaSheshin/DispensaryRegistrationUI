import React from 'react';
import './CreateTemplateButton.css';

const CreateTemplateButton = ({ onClick }) => {
    return (
        <div id="floating-button">
            <button className="create-button" onClick={onClick}>Добавить шаблон</button>
        </div>
    );
};

export default CreateTemplateButton;