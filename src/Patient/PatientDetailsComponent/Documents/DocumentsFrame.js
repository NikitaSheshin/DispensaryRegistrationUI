import React, {useState} from "react";
import Maskinput from "./Maskinput";
import saveIcon from "../../../resources/save_icon.png";
import editIcon from "../../../resources/edit_icon.png";

const DocumentsFrame = ({patient}) => {
    const [isPassportEditing, setPassportEditing] = useState(false);
    const [isSnilsEditing, setSnilsEditing] = useState(false);
    const [isOmsPolicyEditing, setOmsPolicyEditing] = useState(false);

    const [passportData, setPassportData] =
        useState(patient.passportNumber + ' ' + patient.passportSeries);
    const [snilsNumber, setSnilsNumber] = useState(patient.snilsNumber);
    const [omsPolicy, setOmsPolicy] = useState(patient.omsPolicy);

    const handleSaveClick = async () => {
        patient.passportNumber = passportData !== 'undefined undefined' ? passportData.toString().split(' ')[1] : patient.passportNumber;
        patient.passportSeries = passportData !== 'undefined undefined' ? passportData.toString().split(' ')[0] : patient.passportSeries;
        patient.snilsNumber = snilsNumber || patient.snilsNumber;
        patient.omsPolicy = omsPolicy || patient.omsPolicy;

        const url = "http://localhost:8086/patients";

        let sendBody = JSON.parse(JSON.stringify(patient));
        sendBody.diseases = patient.diseases.map((disease) => disease.id);

        console.log(sendBody);

        try {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendBody),
            });
        } catch (error) {

        }
    }

    const handlePassportEditClick = () => {
        setPassportEditing(true);
    }

    const handleSavePassportDataClick = () => {
        setPassportEditing(false);
        handleSaveClick().then();
    }

    const handleSnilsEditClick = () => {
        setSnilsEditing(true);
    }

    const handleSaveSnilsNumberClick = () => {
        setSnilsEditing(false);
        handleSaveClick().then();
    }

    const handleOmsPolicyEditClick = () => {
        setOmsPolicyEditing(true);
    }

    const handleSaveOmsPolicyClick = () => {
        setOmsPolicyEditing(false);
        handleSaveClick().then();
    }

    return (
        <div className="info-block">
            <span className="field-name-span">Документы</span>

            <div>
               <span className="data-line">
                    <span className="line-header">Паспорт:&nbsp;</span>

                   {
                       isPassportEditing ?
                       <span className="data-block">
                            <Maskinput
                                onChange={setPassportData}
                                mask="9999 999999"
                                value={patient.passportSeries + ' ' + patient.passportNumber}
                                placeholder="1111 111111"
                            />
                            <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSavePassportDataClick}/>
                        </span>
                       :
                       <span className="data-block">
                            <span>{patient.passportSeries + ' ' + patient.passportNumber}</span>
                            <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handlePassportEditClick}/>
                        </span>
                   }
                </span>
            </div>

            <div>
               <span className="data-line">
                    <span className="line-header">СНИЛС:&nbsp;</span>

                   {
                       isSnilsEditing ?
                       <span className="data-block">
                            <Maskinput
                                onChange={setSnilsNumber}
                                mask="999-999-999 99"
                                value={patient.snilsNumber}
                                placeholder="111-111-111 22"
                            />
                            <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSaveSnilsNumberClick}/>
                        </span>
                       :
                       <span className="data-block">
                            <span>{patient.snilsNumber}</span>
                            <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handleSnilsEditClick}/>
                       </span>
                   }
                </span>
            </div>

            <div>
               <span className="data-line">
                    <span className="line-header">Полис ОМС:&nbsp;</span>

                   {
                       isOmsPolicyEditing ?
                       <span className="data-block">
                            <Maskinput
                                onChange={setOmsPolicy}
                                mask="9999999999999999"
                                value={patient.omsPolicy}
                                placeholder="1112223334445556"
                            />
                            <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSaveOmsPolicyClick}/>
                        </span>
                       :
                       <span className="data-block">
                            <span>{patient.omsPolicy}</span>
                            <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handleOmsPolicyEditClick}/>
                       </span>
                   }
                </span>
            </div>
        </div>
    );
};

export default DocumentsFrame;