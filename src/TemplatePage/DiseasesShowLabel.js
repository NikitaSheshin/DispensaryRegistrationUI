import React from 'react';
import '../CreateTemplate/CreateTemplatePage.css';

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