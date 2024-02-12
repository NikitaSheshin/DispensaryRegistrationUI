import React, {useEffect, useState} from 'react';
import Header from "../Header";
import MainMenu from "../Menu/MainMenu";
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import DiseaseShowLabel from "../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import EditTemplateButton from "./Buttons/EditTemplateButton";
import DeleteTemplateButton from "./Buttons/DeleteTemplateButton";
import {getDoctorName} from '../Doctor/DoctorsScripts';
import {getTemplateFromServer} from '../Template/TemplatesScripts'

let userData;

const TemplateDetailsPage = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;

    const {id} = useParams();
    const [template, setTemplate] = useState([]);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getTemplateFromServer(id, userData.id);
        };

        fetchDiseases().then(
            data => {
                setTemplate(data); setDiseases(data.diseases)
            }
        );
    }, [id]);


    let doctorName = getDoctorName(userData);

    return (
        <div id="template-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <MainMenu userData={userData}></MainMenu>

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
                    <EditTemplateButton template={template}></EditTemplateButton>
                    <DeleteTemplateButton/>
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