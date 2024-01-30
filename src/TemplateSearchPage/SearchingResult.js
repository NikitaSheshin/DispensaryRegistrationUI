import React from 'react';
import './SearchingResult.css';

const SearchingResult = ({templates}) => {
    return (
       <div id="searching-result">
           <p id="componentHeader">Результаты поиска</p>
           <ul>
               {templates.map(template => (
                   <li key={template.id}>{template.template_name + ", " + template.observation_period + " лет"}</li>
               ))}
           </ul>
       </div>
    );
};

export default SearchingResult;
