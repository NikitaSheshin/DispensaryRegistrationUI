import React from 'react';
import './DiseaseLabel.css';

const DiseaseLabel = ({shownValue, deleteDiseaseHandler, tooltipText}) => {

    return (
        <span className="disease-label" title={tooltipText}>
            <div className="center-container">
                <span>{shownValue}</span>
                <img className="delete-disease-image" src={require("../../resources/DeleteIcon.png")}
                     alt="Ошибочка"
                     onClick={deleteDiseaseHandler}/>
            </div>
        </span>
    );
};

export default DiseaseLabel;