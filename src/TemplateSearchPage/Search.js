import React, { useState } from 'react';
import './Search.css'
import icon from './SearchIcon.png'

const Search = ( {getTemplates} ) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="search-item">
            <h1>Поиск шаблона</h1>
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
                    onClick={() => getTemplates(1)}
                />
            </div>
        </div>
    );
};

export default Search;
