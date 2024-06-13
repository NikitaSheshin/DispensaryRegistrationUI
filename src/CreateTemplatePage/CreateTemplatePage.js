import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../Header";
import './CreateTemplatePage.css';
import DiseaseComponent from "../DiseaseComponents/DiseaseSelectorComponent/DiseaseComponent";
import DiseaseLabel from "../DiseaseComponents/DiseaseLabelComponent/DiseaseLabel";
import {getDiseases} from '../DiseaseComponents/DiseasesScripts';

const CreateTemplatePage = () => {
    const navigate = useNavigate();
    const deleteDiseaseHandler = (indexOfDisease) => {
        const newSelectedDiseases = [...selectedDiseases];
        newSelectedDiseases.splice(indexOfDisease, 1);
        setSelectedDiseases(newSelectedDiseases);

        const newSelectedDiseasesObjects = [...selectedDiseasesObjects];
        newSelectedDiseasesObjects.splice(indexOfDisease, 1);
        setSelectedDiseasesObjects(newSelectedDiseasesObjects);
    };

    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getDiseases();
        };

        fetchDiseases().then(response => setDiseases(response));
    }, []);

    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = userData.lastName + " " + userData.firstName[0] + ". " + userData.patronymic[0] + "."

    const [templateName, setTemplateName] = useState('');
    const [observationPeriod, setObservationPeriod] = useState('');
    const [inspectionsFrequency, setInspectionsFrequency] = useState('1');

    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [observationPeriodErrorMessage, setObservationPeriodErrorMessage] = useState('');
    const [diseasesErrorMessage, setDiseasesErrorMessage] = useState('');

    const addTemplate = async () => {
        let f = true;

        if (templateName === '') {
            setNameErrorMessage('Не указано имя шаблона');
            f = false;
        } else {
            setNameErrorMessage('');
        }

        if (observationPeriod === '') {
            setObservationPeriodErrorMessage('Не указана продолжительность наблюдения');
            f = false;
        } else {
            setObservationPeriodErrorMessage('');
        }

        if (selectedDiseases.length === 0) {
            setDiseasesErrorMessage('Не выбрано ни одно заболевание');
            f = false;
        } else {
            setDiseasesErrorMessage('');
        }

        if (!f) {
            return;
        }

        const url = "http://localhost:8084/templates";

        let uniqueDiseases = selectedDiseasesObjects.map(el => el.id);

        console.log('я тут2')

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    template_name: templateName,
                    observation_period: observationPeriod,
                    inspections_frequency: inspectionsFrequency,
                    doctor_id: userData.id,
                    diseases: uniqueDiseases
                }),
            });
        } catch (error) {

        }

        navigate('/templateSearch', {state: {userData: userData}});
    };

    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [selectedDiseasesObjects, setSelectedDiseasesObjects] = useState([]);

    const diseaseChange = (selectedDisease) => {
        setSelectedDiseases([...selectedDiseases, selectedDisease]);
        setSelectedDiseasesObjects([...selectedDiseasesObjects,
            diseases.find(d => d.icd_id === selectedDisease)]);
    };

    return (
        <div>
            <Header
                doctorName={doctorName}
                doctorSpecialty={userData.specialty}
                selectedMenuItem="templates"
            />
            <hr/>

            <div id="page-content">
                <h1 id="page-header">Создание шаблона</h1>

                <form>
                    <div>
                        {nameErrorMessage && <p style={{color: 'red'}}>{nameErrorMessage}</p>}
                        <div className="input-block">
                            <span className="field-name-span">Название</span>
                            <input
                                placeholder="Введите значение"
                                className="input-field"
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}/>
                        </div>
                    </div>
                    <br/>

                    <div className="input-block">
                        <span className="field-name-span">Заболевания</span>

                        <div>
                            {diseasesErrorMessage && <p style={{color: 'red'}}>{diseasesErrorMessage}</p>}
                            {selectedDiseases
                                .filter((disease, index, array) => array.indexOf(disease) === index)
                                .map((uniqueDisease, index) => (
                                    <DiseaseLabel
                                        key={uniqueDisease}
                                        shownValue={uniqueDisease}
                                        deleteDiseaseHandler={() => deleteDiseaseHandler(index)}
                                    />
                                ))
                            }
                            <DiseaseComponent onChange={diseaseChange} diseases={diseases}/>
                        </div>
                    </div>

                    <br/>
                    <label className="input-block">
                        <span className="field-name-span">Задайте периодичность осмотров</span>
                        <select
                            className="select-field"
                            id="fruits"
                            name="fruits"
                            value={inspectionsFrequency}
                            onChange={(e) => setInspectionsFrequency(e.target.value)}>
                            <option value="" disabled selected>Выберите из списка</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </label>
                    <br/>
                    <label>

                        <div className="input-block">
                            <span className="field-name-span">Задайте продолжительность наблюдения</span>
                            <div>
                            {observationPeriodErrorMessage && <p style={{color: 'red'}}>{observationPeriodErrorMessage}</p>}
                            <input
                                placeholder="Введите значение"
                                className="input-field"
                                type="text"
                                value={observationPeriod}
                                onChange={(e) => setObservationPeriod(e.target.value)}/>
                            </div>
                        </div>
                    </label>
                </form>

                <div id="floating-button">
                    <button id="create-button" onClick={addTemplate}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default CreateTemplatePage;