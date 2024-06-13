import {useLocation} from "react-router-dom";
import {getDoctorName} from "../Doctor/DoctorsScripts";
import React, {useEffect, useState} from "react";
import Header from "../Header";
import DiseaseShowLabel from "../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import {useParams} from "react-router";
import {getVisitById} from "./VisitScipts";
import PersonalDataFrame from "../Patient/PatientDetailsComponent/PersonalDataFrame";
import editIcon from "../resources/edit_icon.png";

let userData;

const AddVisitComponent = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData)
    const {id} = useParams();
    let template = location.state.template;
    let patient = location.state.patient;
    let diseases = template.diseasesNames;

    const [visit, setVisit] = useState(null);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getVisitById(id);
        };

        fetchDiseases().then(
            data => {
                setVisit(data);
            }
        );
    }, [id]);

    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <hr/>

            <div id="page-content">
                <h1 id="page-header">Осмотр</h1>

                <div className="patient-name-block">
                    <div>
                        <div>
                            {patient.lastName} {patient.firstName} {patient.patronymic},&nbsp;
                            {makeDate(patient.birthday)} ({getDateWithDeclination(patient.birthday)}),&nbsp;
                            {patient.gender ? <span>(МУЖ)</span> : <span>(ЖЕН)</span>}
                        </div>
                    </div>
                </div>

                <div id="page-grid">
                    <div className="info-block">
                        <div>
                            <span className="line-header">Дата осмотра: </span>
                            {
                                visit &&
                                <span>{makeDate(visit.visitDate)}</span>
                            }
                        </div>

                        {
                            template &&
                            <div>
                                <span className="line-header">Шаблон: </span>
                                <span>{template.templateName}</span>
                            </div>
                        }

                        <div>
                            <span className="line-header">Заболевания</span> <br/>
                            {
                                diseases && diseases.map((disease) => (
                                    <DiseaseShowLabel
                                        shownValue={disease}
                                    />
                                ))
                            }
                        </div>

                    </div>

                        <div className="info-block">
                            <span className="line-header">Жалобы: </span>
                            {
                                visit &&
                                <span>
                            {visit.complaints}
                        </span>
                            }
                        </div>

                        <div className="info-block">
                            <span className="line-header">Анамнез жизни: </span>
                            {
                                visit &&
                                <span>
                            {visit.lifeAnamnesis}
                        </span>
                            }
                        </div>

                        <div className="info-block">
                            <span className="line-header">Анамнез заболевания: </span>
                            {
                                visit &&
                                <span>
                            {visit.diseaseAnamnesis}
                        </span>
                            }
                        </div>

                        <div className="info-block">
                            <span className="line-header">Рекомендации: </span>
                            {
                                visit &&
                                <span>
                            {visit.recomendations}
                        </span>
                            }
                        </div>

                    </div>
            </div>
        </div>
    );
};

export default AddVisitComponent;

const makeDate = (date) => {
    if(date === undefined) {
        return ""
    }

    let dateString = date.toString();
    let parts = dateString.split('-')

    return parts[2] + '.' + parts[1] + '.' + parts[0]
}

const getDateWithDeclination = (birthday) => {
    let years = getYearsBetweenDates(birthday);

    let mod100 = years % 100;
    let mod10 = years % 10;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9))
        return years + " лет";
    else if (mod10 >= 2 && mod10 <= 4)
        return years + " года";
    else
        return years + " год";
}

const getYearsBetweenDates = (birthday) => {
    let currentDate = new Date();
    let givenDate = new Date(birthday);
    let difference = currentDate - givenDate;

    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
}