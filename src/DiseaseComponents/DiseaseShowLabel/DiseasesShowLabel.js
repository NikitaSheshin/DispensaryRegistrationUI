import React from 'react';
import '../DiseaseSelectorComponent/DiseaseComponent.css';

const DiseaseShowLabel = ({shownValue, tooltipText}) => {

    return (
        <span className="disease-label" title={tooltipText}>
            <div className="center-container">
                <span>{shownValue}</span>
            </div>
        </span>
    );
};

export default DiseaseShowLabel;