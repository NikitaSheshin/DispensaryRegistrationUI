import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getDoctorName} from "../Doctor/DoctorsScripts";
import Header from "../Header";
import {getPatientsWithReceptionToday} from "../Patient/PatientScripts";
import './TodayReceptionComponent.css';
import DiseasesShowLabel from "../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import PatientSearchField from "../Patient/PatientsSearch/PatientSearchField";
import plusIcon from '../resources/plusIcon.png';

const makeDate = (date) => {
    if(date === undefined) {
        return ""
    }

    let dateString = date.toString();
    let parts = dateString.split('-')

    return parts[2] + '.' + parts[1] + '.' + parts[0]
}

const TodayReceptionComponent = () => {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData);

    const [patients, setPatients] = useState([]);

    useEffect(() => {
            const fetchDiseases = async () => {
                return await getPatientsWithReceptionToday();
            };

            fetchDiseases().then(
                data => {
                    setPatients(data);

                    // eslint-disable-next-line array-callback-return
                    data.map(el => {
                        el.receptionTime = el.receptionTime.toString().substring(0, 5);
                        el.birthday = makeDate(el.birthday);
                    })
                }
            );
        }, []
    );

    const navigate = useNavigate();
    const navigateToPatientPage = async (id) => {
        console.log(userData);
        navigate('/patients/' + id.toString(), {state: {userData: userData}});
    };

    const getPatients = async (query) => {
        const url = "http://localhost:8086/patients/searchByQuery?query=" + query;

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
    }

    const redirectToCreatePage = () => {
        navigate('/addPatient', {state: {userData: userData}});
    };

    return (
        <div id="page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty} selectedMenuItem="reception"/>
            <hr/>

            <PatientSearchField getPatients={getPatients}/>
            {
                patients.length > 0 ?
                    (
                        <div>
                            {
                                patients.map((patient) => (
                                    <div className="patient-block" key={patient.id}
                                         onClick={() => navigateToPatientPage(patient.id)}>
                                        <div>
                                            <div>
                                                {patient.lastName + ' ' + patient.firstName + ' ' + patient.patronymic}
                                            </div>
                                            <div className="document-field">
                                                Паспорт: {patient.passportSeries + ' ' + patient.passportNumber}
                                            </div>
                                            <div className="document-field">
                                                СНИЛС: {patient.snilsNumber}
                                            </div>
                                            <div className="document-field">
                                                Полис ОМС: {patient.omsPolicy}
                                            </div>
                                            <div>
                                                {
                                                    patient.diseases.map(
                                                        disease => (
                                                            <DiseasesShowLabel
                                                                shownValue={disease.icd_id}
                                                                tooltipText={disease.disease_name}
                                                            />
                                                        )
                                                    )}
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
        </div>
    );
};

export default TodayReceptionComponent;