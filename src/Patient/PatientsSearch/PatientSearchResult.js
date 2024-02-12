import React from 'react';
import '../../TemplateSearchPage/SearchingResult.css';
import {useNavigate} from "react-router-dom";

const PatientSearchResult = ({patients, userData}) => {
    const navigate = useNavigate();
    const navigateToPatientPage = async (id) => {
        console.log(userData);
        navigate('/patients/' + id.toString(), { state: { userData: userData } });
    };

    return (
        <div id="searching-result">
            <p id="componentHeader">Результаты поиска</p>
            <ul>
                {patients.map(patient => (
                    <li key={patient.id} onClick={() => navigateToPatientPage(patient.id)}>
                        {patient.lastName + " " + patient.firstName + " " + patient.patronymic}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientSearchResult;
