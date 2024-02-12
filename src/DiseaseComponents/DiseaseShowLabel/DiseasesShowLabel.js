import React from 'react';
import '../DiseaseSelectorComponent/DiseaseComponent.css';

const DiseaseShowLabel = ({shownValue}) => {

    return (
        <span className="disease-label">
            <div className="center-container">
                <span>{shownValue}</span>
            </div>
        </span>
    );
};

export default DiseaseShowLabel;