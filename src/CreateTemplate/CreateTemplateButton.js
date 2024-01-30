import React from 'react';
import './CreateTemplateButton.css';

const CreateTemplateButton = ({ onClick }) => {
    return (
        <div id="floating-button">
            <button id="create-button" onClick={onClick}>Добавить шаблон</button>
        </div>
    );
};

export default CreateTemplateButton;