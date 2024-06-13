import React, {useState} from "react";
import Maskinput from "./Maskinput";
import saveIcon from "../../../resources/save_icon.png";
import editIcon from "../../../resources/edit_icon.png";

const OneDocumentComponent = ({ documentName, patient, saveState, setData, defaultValue,
                              inputMask, actualValue}) => {
    const [isEditing, setEditing] = useState(false);
    const [inputData, setInputData] = useState(defaultValue);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleSaveClick = () => {
        saveState();
        setEditing(false);
    }

    const inputChange = (e) => {
        setData(e);
        setInputData(e);
    }

    return (
        <div>
               <span className="data-line">
                    <span className="line-header">{documentName}:&nbsp;</span>

                    {isEditing ?
                        <span className="data-block">
                            <Maskinput
                                onChange={inputChange}
                                mask={inputMask}
                                value={defaultValue}
                                placeholder="1111 111111"
                            />
                            <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSaveClick}/>
                        </span>
                        :
                        <span className="data-block">
                            <span>{inputData}</span>
                            <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handleEditClick}/>
                        </span>
                    }
                </span>
        </div>
    );
}

export default OneDocumentComponent;