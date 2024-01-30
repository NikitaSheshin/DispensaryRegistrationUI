import React from 'react';
import './CreateTemplatePage.css';

const DiseaseLabel = ({shownValue, deleteDiseaseHandler}) => {

    return (
        <span className="disease-label">
      <div className="center-container">
        <span>{shownValue}</span>
        <img className="delete-disease-image" src={require("./DeleteIcon.png")} alt="Ошибочка"
        onClick={deleteDiseaseHandler}/>
      </div>
    </span>
    );
};

export default DiseaseLabel;