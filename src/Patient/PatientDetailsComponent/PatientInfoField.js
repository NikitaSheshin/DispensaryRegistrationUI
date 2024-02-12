import React from "react";


const PatientInfoField = ({fieldName, fieldValue}) => {
    return (
        <>
            <label>
                <div className="input-block">
                    <span className="field-name-span">{fieldName}</span>
                    <span>{fieldValue}</span>
                </div>
            </label>
            <br/>
        </>
    );
};

export default PatientInfoField;