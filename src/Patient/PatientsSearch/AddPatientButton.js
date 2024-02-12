import React from 'react';
import '../../CreateTemplatePage/CreateTemplateButton.css';

const AddPatientButton = ({ onClick }) => {
    return (
        <div id="floating-button">
            <button className="create-button" onClick={onClick}>Добавить пациента</button>
        </div>
    );
};

export default AddPatientButton;