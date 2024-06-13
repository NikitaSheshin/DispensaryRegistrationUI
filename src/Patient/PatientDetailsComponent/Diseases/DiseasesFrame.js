import React, {useEffect, useState} from "react";
import editIcon from "../../../resources/edit_icon.png";
import DiseaseShowLabel from "../../../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import saveIcon from "../../../resources/save_icon.png";
import DiseaseLabel from "../../../DiseaseComponents/DiseaseLabelComponent/DiseaseLabel";
import {getDiseases} from "../../../DiseaseComponents/DiseasesScripts";
import DiseaseComponent from "../../../DiseaseComponents/DiseaseSelectorComponent/DiseaseComponent";

const DiseasesFrame = ({patient, patientDiseases, putUrl}) => {
    const [isEditing, setEditing] = useState(false);

    const deleteDiseaseHandler = (indexOfDisease) => {
        const newSelectedDiseasesObjects = [...selectedDiseasesObjects];
        newSelectedDiseasesObjects.splice(indexOfDisease, 1);
        setSelectedDiseasesObjects(newSelectedDiseasesObjects);
    };

    const [selectedDiseasesObjects, setSelectedDiseasesObjects] = useState([]);

    useEffect(() => {
        setSelectedDiseasesObjects([...patientDiseases]);
    }, [patientDiseases]);

    const diseaseChange = (selectedDisease) => {
        setSelectedDiseasesObjects([...selectedDiseasesObjects,
            diseases.find(d => d.icd_id === selectedDisease)]);
    };

    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getDiseases();
        };

        fetchDiseases().then(response => setDiseases(response));
    }, []);

    const handleSaveClick = async () => {
        // const url = "http://localhost:8086/patients";
        const url = putUrl;

        let sendBody = JSON.parse(JSON.stringify(patient));
        sendBody.diseases = selectedDiseasesObjects.map((disease) => disease.id)

        try {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendBody),
            });
        } catch (error) {

        }
    }

    const handleEditing = () => {
        setEditing(true);
    }

    const handleSaveDiseasesClick = () => {
        handleSaveClick().then();
        setEditing(false);
    }

    return (
        <div className="info-block">
            {
                isEditing ?
                    <div>
                        <div className="diseases-header-block">
                            <div>
                                <span className="field-name-span">Заболевания</span>
                            </div>
                            <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSaveDiseasesClick}/>
                        </div>
                        <div>
                        {
                            selectedDiseasesObjects.length > 0 &&
                            (
                                <div>
                                    {
                                        selectedDiseasesObjects
                                            .filter((disease, index, array) => array.indexOf(disease) === index)
                                            .map((uniqueDisease, index) => (
                                                <DiseaseLabel
                                                    key={uniqueDisease.icd_id}
                                                    shownValue={uniqueDisease.icd_id}
                                                    deleteDiseaseHandler={() => deleteDiseaseHandler(index)}
                                                    tooltipText={uniqueDisease.disease_name}
                                                />
                                            ))
                                    }
                                </div>

                            )
                        }
                            <DiseaseComponent onChange={diseaseChange} diseases={diseases}/>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="diseases-header-block">
                            <div>
                                <span className="field-name-span">Заболевания</span>
                            </div>
                            <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handleEditing}/>
                        </div>
                        {
                            selectedDiseasesObjects.length > 0 &&
                            (
                                <div>
                                    {
                                        selectedDiseasesObjects.map((disease) => (
                                            <DiseaseShowLabel
                                                shownValue={disease.icd_id}
                                                tooltipText={disease.disease_name}
                                            />
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default DiseasesFrame;