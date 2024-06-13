import React, {useState} from "react";
import Header from "../../Header";
import {useLocation, useNavigate} from "react-router-dom";
import {getDoctorName} from "../../Doctor/DoctorsScripts";
import InspectionQueryString from "./InspectionQueryString";
import plusIcon from "../../resources/plusIcon.png";
import './InspectionSearchPage.css';

export default function InspectionSearchPage() {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData)

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [patients, setPatients] = useState([]);

    const getPatients = async () => {
        const url = "http://localhost:8084/templates/getPatientsBetweenDate?" +
        "doctor_id=" + userData.id + "&from_date=" + fromDate + "&to_date=" + toDate;

        console.log(url);

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status !== 200) {
                console.log("ошибка " + response.status)
                return;
            }

            const fetchedPatients = await response.json();
            setPatients(fetchedPatients);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    };

    const navigate = useNavigate();
    const redirectToCreatePage = () => {
        navigate('/addPatient', { state: { userData: userData } });
    };

    const navigateToPatientPage = async (id) => {
        console.log(userData);
        navigate('/patients/' + id.toString(), {state: {userData: userData}});
    };

    const downloadReport = async () => {
        const url = "http://localhost:8084/templates/inspectionFile?" +
            "doctor_id=" + userData.id + "&from_date=" + fromDate + "&to_date=" + toDate;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Осмотра пациентов ' + fromDate + '-' + toDate + '.pdf'; // Set the desired file name here
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl); // Clean up after yourself
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    return (
        <>
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty} selectedMenuItem="inspections"/>

            <hr/>

            <InspectionQueryString setFromDate={setFromDate}
                                   setToDate={setToDate}
                                   search={getPatients}/>

            {
                patients.length > 0 ?
                    (
                        <div>
                            <div className="download-report-block" onClick={downloadReport}>Скачать отчет</div>
                            {
                                patients.map((patient) => (
                                    <div className="patient-block" key={patient.patientDTO.id}
                                         onClick={() => navigateToPatientPage(patient.patientDTO.id)}>
                                        <div>
                                            <div>
                                                {patient.patientDTO.lastName + ' ' + patient.patientDTO.firstName + ' ' + patient.patientDTO.patronymic}
                                            </div>
                                            <div className="document-field">
                                                Паспорт: {patient.patientDTO.passportSeries + ' ' + patient.patientDTO.passportNumber}
                                            </div>
                                            <div className="document-field">
                                                СНИЛС: {patient.patientDTO.snilsNumber}
                                            </div>
                                            <div className="document-field">
                                                Полис ОМС: {patient.patientDTO.omsPolicy}
                                            </div>
                                            <div className="document-field">
                                                Дата осмотра: {patient.nextObservationDate}
                                            </div>
                                        </div>
                                        <div>
                                            {patient.receptionTime}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) :
                    (
                        <div id="not-found-result">
                            <div id="not-found-text">По вашему запросу ничего не найдено</div>
                            <div id="add-patient-block" onClick={redirectToCreatePage}>
                                <img src={plusIcon} alt="Ошибка"/>
                                <span>Добавить пациента</span>
                            </div>
                        </div>
                    )
            }
        </>
    );
}