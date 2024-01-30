import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../Header";
import MainMenu from "../Menu/MainMenu";
import Search from "./Search";
import SearchingResult from "./SearchingResult";
import CreateTemplateButton from "../CreateTemplate/CreateTemplateButton";
import './TemplateSearch.css';

let userData;

const TemplateSearch = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = userData.lastName + " " + userData.firstName[0] + ". " + userData.patronymic[0] + "."

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTemplates = async() => {
        const url = "http://localhost:8080/templates?doctor_id=" +  userData.id;

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
            console.log(fetchedTemplates[0]);
        } catch (error) {
            console.error('Произошла ошибка:', error);
        }
    }

    const navigate = useNavigate();

    const redirectToCreatePage = () => {
        navigate('/createTemplate', { state: { userData: userData } });
    };



    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <MainMenu></MainMenu>
            <Search getTemplates={getTemplates}></Search>

            {loading ? (
                <p id="result-placeholder">Результаты поиска</p>
            ) : (
                <SearchingResult templates={templates}></SearchingResult>
            )}

            <CreateTemplateButton onClick={redirectToCreatePage}></CreateTemplateButton>
        </div>
    );
};

export default TemplateSearch;