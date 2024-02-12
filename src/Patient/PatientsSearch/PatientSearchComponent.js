import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../../TemplateSearchPage/TemplateSearch.css';
import Header from "../../Header";
import MainMenu from "../../Menu/MainMenu";
import PatientSearchResult from "./PatientSearchResult";
import AddPatientButton from "./AddPatientButton";
import PatientSearchField from "./PatientSearchField";

let userData;

const PatientSearchComponent = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = userData.lastName + " " + userData.firstName[0] + ". " + userData.patronymic[0] + "."

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPatients = async(pageNumber) => {
        const url = "http://localhost:8080/patients";

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
            setLoading(false);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    const navigate = useNavigate();

    const redirectToCreatePage = () => {
        navigate('/addPatient', { state: { userData: userData } });
    };

    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <MainMenu userData={userData}></MainMenu>
            <PatientSearchField getPatients={getPatients}></PatientSearchField>

            {loading ? (
                <p id="result-placeholder">Результаты поиска</p>
            ) : (
                <PatientSearchResult patients={patients} userData={userData}></PatientSearchResult>
            )}

            <AddPatientButton onClick={redirectToCreatePage}></AddPatientButton>
        </div>
    );
};

export default PatientSearchComponent;