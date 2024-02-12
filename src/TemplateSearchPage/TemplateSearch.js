import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Header from "../Header";
import MainMenu from "../Menu/MainMenu";
import Search from "./Search";
import SearchingResult from "./SearchingResult";
import CreateTemplateButton from "../CreateTemplatePage/CreateTemplateButton";
import './TemplateSearch.css';
import {getDoctorName} from "../Doctor/DoctorsScripts";

let userData;

const TemplateSearch = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData)

    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const getTemplates = async(pageNumber) => {
        let url = "http://localhost:8080/templates?doctor_id=" +  userData.id +
            "&page_number=" + pageNumber;

        if(searchQuery !== '') {
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
        navigate('/createTemplate', { state: { userData: userData } });
    };

    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <MainMenu userData={userData}></MainMenu>
            <Search getTemplates={getTemplates} onChange={setSearchQuery}></Search>

            {loading ? (
                <p id="result-placeholder">Результаты поиска</p>
            ) : (
                <SearchingResult templates={templates} userData={userData}></SearchingResult>
            )}

            <CreateTemplateButton onClick={redirectToCreatePage}></CreateTemplateButton>
        </div>
    );
};

export default TemplateSearch;