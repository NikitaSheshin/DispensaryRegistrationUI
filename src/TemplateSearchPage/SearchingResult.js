import React from 'react';
import './SearchingResult.css';
import {useNavigate} from "react-router-dom";
import plusIcon from "../resources/plusIcon.png";

const SearchingResult = ({templates, userData}) => {
    const navigate = useNavigate();
    const navigateToTemplatePage = async (id) => {
        navigate('/templates/' + id.toString(), {state: {userData: userData}});
    };

    const redirectToCreatePage = () => {
        navigate('/createTemplate', { state: { userData: userData } });
    };

    const getYear = (yearNumber) => {
        let mod100 = yearNumber % 100;
        let mod10 = yearNumber % 10;

        if ((mod100 >= 11 && mod100 <= 14) ||
            (mod10 >= 5 && mod10 <= 9))
            return " лет";
        else if (mod10 >= 2 && mod10 <= 4)
            return " года";
        else
            return " год";
    };

    const getPeriod = (yearNumber) => {
        let mod100 = yearNumber % 100;
        let mod10 = yearNumber % 10;

        if ((mod100 >= 11 && mod100 <= 14) ||
            (mod10 >= 5 && mod10 <= 9))
            return " раз в год";
        else if (mod10 >= 2 && mod10 <= 4)
            return " раза в год";
        else
            return " раз в год";
    };


    let curNumber = 1;
    return (
        <div id="searching-result">
            {
                templates.length > 0 ?
                    (
                        <>
                            <p id="componentHeader">Результаты поиска</p>
                            {/* eslint-disable-next-line react/style-prop-object */}
                            <div id="result-container">
                                <table id="result-table">
                                    <tbody>
                                    <tr>
                                        <th className="number-table-column">№</th>
                                        <th className="name-table-column">Название</th>
                                        <th className="period-table-column">Продолжительность</th>
                                        <th className="frequency-table-column">Периодичность</th>
                                    </tr>

                                    {templates.map(template => (
                                        <tr className="table-row"
                                            key={template.id} onClick={() => navigateToTemplatePage(template.id)}>
                                            <td className="number-table-column">{curNumber++}</td>
                                            <td className="name-table-column">{template.template_name}</td>
                                            <td className="period-table-column">
                                                {template.observation_period} {getYear(template.observation_period)}
                                            </td>
                                            <td className="frequency-table-column">
                                                {template.inspections_frequency} {getPeriod(template.inspections_frequency)}
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
                    :
                    (
                        <div id="not-found">
                            <div id="not-found-text">По вашему запросу ничего не найдено</div>
                            <div id="add-patient-block" onClick={redirectToCreatePage}>
                                <img src={plusIcon} alt="Ошибка"/>
                                <span>Добавить шаблон</span>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default SearchingResult;
