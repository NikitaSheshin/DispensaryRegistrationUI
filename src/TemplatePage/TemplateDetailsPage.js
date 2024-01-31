import React, {useEffect, useState} from 'react';
import Header from "../Header";
import MainMenu from "../Menu/MainMenu";
import {useParams} from "react-router";
import {useLocation, useNavigate} from "react-router-dom";
import './TemplateDetailsPage.css';
import DiseaseShowLabel from "./DiseasesShowLabel";

let userData;

const getTemplate = async (templateId, doctorId) => {
    try {
        const paramName = 'doctor_id'
        const url = `http://localhost:8080/templates/${templateId}?${paramName}=${doctorId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        });

        return await response.json();
    }
    catch (error)
    {
        return {}
    }
};

const TemplateDetailsPage = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;

    const {id} = useParams();
    const [template, setTemplate] = useState([]);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            const data = await getTemplate(id, userData.id);
            setTemplate(data);
            setDiseases(data.diseases)
        };

        fetchDiseases();
    }, [id]);

    let doctorName = userData.lastName + " " + userData.firstName[0] +
        ". " + userData.patronymic[0] + ".";

    const navigate = useNavigate();
    function deleteTemplate(templateId) {
        try {
            const url = `http://localhost:8080/templates/${templateId}`;
            fetch(url, {
                method: 'DELETE'
            }).then(() => console.log("Удалил"));

            // eslint-disable-next-line react-hooks/rules-of-hooks

            navigate('/templateSearch', { state: { userData: userData } });
        }
        catch (error)
        {
        }
    }

    return (
        <div id="template-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <MainMenu></MainMenu>

            <div id="page-content">
                <h1 id="page-header">Создание шаблона</h1>

                <label>
                    <div className="input-block">
                        <span className="field-name-span">Название</span>
                        <span>{template.template_name} </span>
                    </div>
                </label>
                <br/>

                <span className="field-name-span">Заболевания</span>
                <br/>


                {
                    diseases.map((disease) => (
                        <DiseaseShowLabel
                            shownValue={disease.disease_name}
                        />
                    ))
                }

                <br/>
                <label className="input-block">
                    <span className="field-name-span">Периодичность осмотров</span>
                    <span>{template.inspections_frequency} {getInspectionsText(template.inspections_frequency)}</span>
                </label>
                <br/>
                <label>
                    <div className="input-block">
                        <span className="field-name-span">Продолжительность наблюдения</span>
                        <span>{template.observation_period} {getObservationText(template.observation_period)}</span>
                    </div>
                </label>
                <br/>
                <label>
                    <span className="field-name-span">Исслодования</span>
                    <br/>
                </label>

                <div id="floating-button">
                    <button className="create-button">Изменить</button>
                    <button className="create-button" onClick={() => deleteTemplate(id)}>Удалить</button>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailsPage;

function getInspectionsText(value) {
    let mod100 = value % 100;
    let mod10 = value % 10;

    let res;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9)) {
        res = "раз";
    }
    else if (mod10 >= 2 && mod10 <= 4) {
        res = "раза";
    }
    else {
        res = "раз";
    }

    return res + ' в год';
}

function getObservationText(value) {
    let mod100 = value % 100;
    let mod10 = value % 10;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9)) {
        return "лет";
    }
    else if (mod10 >= 2 && mod10 <= 4) {
        return "года";
    }
    else {
        return  "год";
    }
}