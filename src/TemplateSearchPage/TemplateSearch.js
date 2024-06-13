import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../Header";
import Search from "./Search";
import SearchingResult from "./SearchingResult";
import './TemplateSearch.css';
import {getDoctorName} from "../Doctor/DoctorsScripts";
import plusIcon from "../resources/plusIcon.png";

let userData;

const TemplateSearch = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData)

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getTemplates = async (pageNumber) => {
        let url = "http://localhost:8084/templates?doctor_id=" + userData.id +
            "&page_number=" + pageNumber;

        if (searchQuery !== '') {
            url += '&request=' + searchQuery;
        }

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

            const fetchedTemplates = await response.json();
            setTemplates(fetchedTemplates);
            setLoading(false);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    const navigate = useNavigate();

    const redirectToCreatePage = () => {
        navigate('/createTemplate', {state: {userData: userData}});
    };

    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty} selectedMenuItem="templates"/>
            <hr/>

            <Search getTemplates={getTemplates} onChange={setSearchQuery}/>

            {
                loading ?
                    (
                        <div id="non-search-wrapper">
                            <div id="not-found-result">
                                <div id="add-patient-block" onClick={redirectToCreatePage}>
                                    <img src={plusIcon} alt="Ошибка"/>
                                    <span>Добавить шаблон</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <SearchingResult templates={templates} userData={userData}/>
                    )}
        </div>
    );
}

export default TemplateSearch;