import React from 'react';
import './Button.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useParams} from "react-router";

const EditTemplateButton = ({ template }) => {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    const {id} = useParams();

    const navigate = useNavigate();
    function editTemplate(templateId) {
        navigate('/templates/' + templateId + "/edit", {state: {userData: userData, template: template}});
    }

    return (
        <button className="create-button" onClick={() => editTemplate(id)}>Изменить</button>
    );
};

export default EditTemplateButton;