import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {useParams} from "react-router";
import {useLocation, useNavigate} from "react-router-dom";
import {getDoctorName} from '../Doctor/DoctorsScripts';
import {getTemplateFromServer} from '../Template/TemplatesScripts'
import './TemplateDetailsPage.css';
import MainInfoComponent from "./MainInfoComponent";
import DiseasesFrame from "../Patient/PatientDetailsComponent/Diseases/DiseasesFrame";
import delete_icon from '../resources/delete_icon.png'

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
                setTemplate(data);
                setDiseases(data.diseases)
            }
        );
    }, [id]);

    let doctorName = getDoctorName(userData);

    const navigate = useNavigate();
    function deleteTemplate() {

        try {
            const url = `http://localhost:8084/templates/${id}`;
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
            <Header
                doctorName={doctorName}
                doctorSpecialty={userData.specialty}
                selectedMenuItem="templates"
            />
            <hr/>

            <div id="page-content">
                <h1 id="page-header">Шаблон</h1>

                <div id="page-grid">
                    <MainInfoComponent template={template}/>

                    <DiseasesFrame patient={template}
                                   patientDiseases={diseases}
                                   putUrl={"http://localhost:8084/templates/" + template.id}/>
                </div>

                {/*<label>*/}
                {/*    <span className="field-name-span">Исследования</span>*/}
                {/*</label>*/}

                <div id="floating-button">
                    <div id="not-found-result">
                        <div id="add-patient-block" onClick={deleteTemplate}>
                            <span>Удалить</span>
                            <img src={delete_icon} alt="Ошибка"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateDetailsPage;


