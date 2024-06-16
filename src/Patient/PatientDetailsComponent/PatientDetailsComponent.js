import Header from "../../Header";
import {useLocation, useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {getDoctorName} from "../../Doctor/DoctorsScripts";
import React, {useEffect, useState} from "react";
import {getPatientFromServer} from "../PatientScripts";
import {getTemplateByPatientAndDoctor} from "../../Template/TemplatesScripts";
import "./PatientDetailsComponent.css";
import DocumentsFrame from "./Documents/DocumentsFrame";
import DiseasesFrame from "./Diseases/DiseasesFrame";
import DiseaseShowLabel from "../../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import PersonalDataFrame from "./PersonalDataFrame";

const getAllVisits = async (doctorId, patientId) => {
    const url = "http://localhost:8087/visits/" + doctorId + "/" + patientId;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        return await response.json()
    } catch (error) {

    }
}

const makeDate = (date) => {
    if(date === undefined) {
        return ""
    }

    let dateString = date.toString();
    let parts = dateString.split('-')

    return parts[2] + '.' + parts[1] + '.' + parts[0]
}

const PatientDetailsComponent = () => {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData);

    const {id} = useParams();

    const [patient, setPatient] = useState([]);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getPatientFromServer(id);
        };

        fetchDiseases().then(
            data => {
                setPatient(data);
                setDiseases(data.diseases)
            }
        );
    }, [id]);

    const [template, setTemplate] = useState([]);

    useEffect(() => {
        if (template) { // Only run the effect if template is not null
            const fetchTemplate = async () => {
                return await getTemplateByPatientAndDoctor(id, userData.id);
            };

            fetchTemplate().then(
                data => {
                    setTemplate(data);
                }
            );
        }
    }, [id, userData.id, template.id]);

    const [visits, setVisits] = useState([])

    useEffect(() => {
        const fetchVisits = async () => {
            return await getAllVisits(userData.id, id);
        };

        fetchVisits().then(
            data => {
                setVisits(data);
            }
        );
    }, [id, userData.id]);

    const inspectionLeave = () => {
        try {
            const patient_service_url = `http://localhost:8086/patients/inspection/${id}`;
            fetch(patient_service_url, {
                method: 'DELETE'
            }).then(() => {
                setPatient(prev => ({ ...prev, observed: false }));
            });
        } catch (error) {
        }

        try {
            const template_service_url =
                `http://localhost:8084/templates/inspection?patient_id=${id}&template_id=${template.templateId}`;

            fetch(template_service_url, {
                method: 'DELETE'
            }).then(() => {
                setTemplate(null)
            });
        } catch (error) {
        }
    }

    const setInspection = async () => {
        const templateWindow = window.open("/selectTemplate/" + userData.id, "_blank", "width=600,height=500");

        const handleMessage = async (event) => {
            if (event.source === templateWindow) {
                const receivedTemplate = event.data;

                try {
                    const url = `http://localhost:8086/patients/inspection/${id}`;
                    await fetch(url, {
                        method: 'POST'
                    }).then(() => {
                        setPatient(prev => ({ ...prev, observed: true }));
                    });
                } catch (error) {
                }

                try {
                    const url = `http://localhost:8084/templates/inspection?patient_id=${id}&template_id=${receivedTemplate}`;
                    await fetch(url, {
                        method: 'POST'
                    }).then(async () => {
                        const fetchDiseases = async () => {
                            return await getTemplateByPatientAndDoctor(id, userData.id);
                        };

                        fetchDiseases().then(
                            data => {
                                setTemplate(data);
                            }
                        );
                    });
                } catch (error) {
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    }


    let navigate = useNavigate();

    const navigateToVisitPage = async (id) => {
        navigate('/visits/' + id.toString(), {state: {userData: userData, template: template, patient: patient}});
    };

    const [complaints, setComplaints] = useState('');
    const [lifeAnamnesis, setLifeAnamnesis] =
        useState(visits.length > 0 ? visits[visits.length - 1].lifeAnamnesis : "");
    const [diseaseAnamnesis, setDiseaseAnamnesis] =
        useState(visits.length > 0 ? visits[visits.length - 1].diseaseAnamnesis : "");
    const [recomendations, setRecomendations] = useState('');

    const completeVisit = async () => {
        if(!patient.observed) {
            alert("Пациент не состоит на учете")
            return;
        }

        const url = "http://localhost:8087/visits";

        const currentDate = new Date();

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: id,
                    doctorId: userData.id,
                    complaints: complaints,
                    lifeAnamnesis: lifeAnamnesis,
                    diseaseAnamnesis: diseaseAnamnesis,
                    recomendations: recomendations,
                    visitDate: formatDate(currentDate)
                }),
            });
        } catch (error) {

        }

        try {
            await fetch("http://localhost:8084/templates/updateObservationDate", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: id,
                    doctorId: userData.id,
                    nextObservationDate: formatDate(nextObservationDate)
                }),
            });
        } catch (error) {

        }

        template.nextObservationDate = formatDate(nextObservationDate);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        fetchVisits();
    }

    useEffect(() => {
        fetchVisits();
    }, [id, userData.id]);

    const fetchVisits = async () => {
        try {
            const data = await getAllVisits(userData.id, id);
            setVisits(data);
        } catch (error) {
            console.error("Error fetching visits:", error);
        }
    };

    function formatDate(date) {
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы начинаются с 0
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        } catch (err) {
            return new Date().toString();
        }
    }

    function getNextObservationDate(n) {
        if (n === undefined) {
            return new Date();
        }

        var today = new Date();
        var partLength = Math.floor(365 / n);

        var futureDate = new Date(today.getTime() + partLength * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleString("ru");
    }

    const [nextObservationDate, setNextObservationDate] =
        useState(makeDate(
            template ?
                getNextObservationDate(template.inspectionsFrequency)
                :
                new Date()
        ));

    function handleDateChange(date) {
        setNextObservationDate(date);
    }

    return (
        <div id="page">
            <Header
                doctorName={doctorName}
                doctorSpecialty={userData.specialty}
                selectedMenuItem="reception"
            />
            <hr/>

            <div id="page-content">
                <PersonalDataFrame patient={patient}/>

                <div id="page-grid">
                    <DocumentsFrame patient={patient}/>

                    <DiseasesFrame patient={patient}
                                   patientDiseases={diseases}
                                   putUrl="http://localhost:8086/patients"/>

                    <div className="info-block">
                        <div>
                            <span className="field-name-span">Наблюдение</span>
                        </div>
                        <span className="line-header">Наблюдается: </span>

                        {
                            patient.observed && template ?
                                (
                                    <>
                                        <span>Да &emsp;</span>
                                        <div>
                                            <span className="line-header">Название шаблона: </span>
                                            <span>{template.templateName} &emsp;</span>
                                            <span className="inspection-change"
                                                  onClick={inspectionLeave}>
                                        Снять с учета
                                    </span>
                                        </div>

                                        <div>
                                            <span className="line-header">Следующий осмотр: </span>
                                            <span>{makeDate(template.nextObservationDate)}&emsp;</span>
                                        </div>
                                    </>
                                ) : (
                                    <span>
                                    <span>Нет &emsp;</span>
                                    <span className="inspection-change"
                                          onClick={setInspection}>
                                        Поставить на учет
                                    </span>
                                </span>
                                )
                        }
                    </div>
                    <div className="info-block"
                         id="prev-inspections">
                        <span className="field-name-span">Предыдущие осмотры</span>
                        {
                            visits.length > 0 &&
                            visits.map((visit) => (
                                <div
                                    className="prev-inspection"
                                    key={visit.id}
                                    onClick={() => navigateToVisitPage(visit.id)}>
                                    {visit.visitDate && makeDate(visit.visitDate)}
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="info-block">
                    <span className="field-name-span">Осмотр</span>

                    <div className="visit-input-block">
                        <span className="line-header">Жалобы</span>
                        <br/>

                        <textarea
                            rows="4" cols="50"
                            className="textarea-field"
                            onChange=
                                {
                                    event => setComplaints(event.target.value)
                                }
                        />
                    </div>

                    <div className="visit-input-block">
                        <span className="line-header">Анамнез жизни</span>
                        <br/>

                        <textarea
                            rows="4" cols="50"
                            className="textarea-field"
                            onChange=
                                {
                                    event => setLifeAnamnesis(event.target.value)
                                }

                            defaultValue={visits.length > 0 ? visits[visits.length - 1].lifeAnamnesis : ""}
                        />
                    </div>

                    <div className="visit-input-block">
                        <span className="line-header">Анамнез заболевания</span>
                        <br/>

                        <textarea
                            rows="4" cols="50"
                            className="textarea-field"
                            onChange=
                                {
                                    event => setDiseaseAnamnesis(event.target.value)
                                }
                            defaultValue={visits.length > 0 ? visits[visits.length - 1].diseaseAnamnesis : ""}
                        />
                    </div>

                    <div className="visit-input-block">
                        <span className="line-header">Диагноз</span>
                        <br/>

                        {
                            diseases.length > 0 &&
                            (
                                <div>
                                    {
                                        diseases.map((disease) => (
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

                    <div className="visit-input-block">
                        <span className="line-header">Рекомендации, назначения</span>
                        <br/>

                        <textarea
                            rows="4" cols="50"
                            className="textarea-field"
                            onChange=
                                {
                                    event => setRecomendations(event.target.value)
                                }
                        />
                    </div>

                    <div className="next-observation-date-block">
                        <span className="line-header">Дата следующего осмотра</span>

                        <DatePicker
                            className="next-observation-date-field"
                            selected={nextObservationDate}
                            onChange={handleDateChange}
                            dateFormat="dd.MM.yyyy"
                            locale={ru}
                        />
                    </div>

                    <div className="save-visit-button" onClick={completeVisit}>
                        <span>Закончить осмотр</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDetailsComponent;