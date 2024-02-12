import React, { useState } from 'react';
import '../../TemplateSearchPage/Search.css'
import icon from '../../resources/SearchIcon.png'

const PatientSearchField = ( {getPatients} ) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-item">
            <h1>Поиск пациента</h1>
            <div id="input-block">
                <input id="input-field"
                       type="text"
                       placeholder="Введите запрос..."
                       value={searchQuery}
                       onChange={handleSearchChange}
                />
                <img
                    id="input-icon"
                    src={icon}
                    alt="Иконка поиска"
                    style={{}}
                    onClick={() => getPatients(1)}
                />
            </div>
        </div>
    );
};

export default PatientSearchField;
