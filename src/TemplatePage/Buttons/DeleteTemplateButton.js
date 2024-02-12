import React from 'react';
import './Button.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useParams} from "react-router";

const DeleteTemplateButton = ({ template }) => {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    const {id} = useParams();

    const navigate = useNavigate();
    function deleteTemplate(templateId) {
        try {
            const url = `http://localhost:8080/templates/${id}`;
            fetch(url, {
                method: 'DELETE'
            }).then(() => console.log("Удалил"));

            // eslint-disable-next-line react-hooks/rules-of-hooks
            navigate('/templateSearch', { state: { userData: userData } });
        }
        catch (error)
        {
        }
    }

    return (
        <button className="create-button" onClick={deleteTemplate}>Удалить</button>
    );
};

export default DeleteTemplateButton;