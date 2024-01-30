import React from 'react';
import './DiseaseComponent.css';

const DiseaseComponent = ({onChange, diseases}) => {
    const handleDiseaseChange = (e) => {
        const selectedDisease = e.target.value;
        onChange(selectedDisease);
    };

    return (
        <label>
            <select className="select-field"
                    id="diseases"
                    name="diseases"
                    onChange={handleDiseaseChange}
            value="">
                <option value="" disabled selected>Выберите из списка</option>
                {diseases.map((disease, index) => (
                    <option key={index} value={disease.disease_name}>{disease.disease_name}</option>
                ))}
            </select>
        </label>
    );
};

export default DiseaseComponent;