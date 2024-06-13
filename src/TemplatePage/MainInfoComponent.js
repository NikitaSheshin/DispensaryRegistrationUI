import React, {useState} from "react";
import Maskinput from "../Patient/PatientDetailsComponent/Documents/Maskinput";
import saveIcon from "../resources/save_icon.png";
import editIcon from "../resources/edit_icon.png";

const MainInfoComponent = ({template}) => {
    const [isTemplateNameEditing, setTemplateNameEditing] = useState(false);
    const [isObservationPeriodEditing, setObservationPeriodEditing] = useState(false);
    const [isInspectionFrequencyEditing, setInspectionFrequencyEditing] = useState(false);

    const [templateName, setTemplateName] =
        useState(template.template_name);
    const [observationPeriod, setObservationPeriod] = useState(template.observation_period);
    const [inspectionFrequency, setInspectionFrequency] = useState(template.inspections_frequency);

    const handleSaveClick = async () => {
        template.template_name = templateName || template.template_name;

        template.observation_period = observationPeriod || template.observation_period;
        template.inspections_frequency = inspectionFrequency || template.inspections_frequency;

        const url = "http://localhost:8084/templates/" + template.id;

        let sendBody = JSON.parse(JSON.stringify(template));
        sendBody.diseases = template.diseases.map((disease) => disease.id);

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

    const handleTemplateNameEditClick = () => {
        setTemplateNameEditing(true);
    }

    const handleSaveTemplateNameDataClick = () => {
        setTemplateNameEditing(false);
        handleSaveClick().then();
    }

    const handleObservationPeriodEditClick = () => {
        setObservationPeriodEditing(true);
    }

    const handleSaveObservationPeriodClick = () => {
        setObservationPeriodEditing(false);
        handleSaveClick().then();
    }

    const handleInspectionFrequencyEditClick = () => {
        setInspectionFrequencyEditing(true);
    }

    const handleSaveInspectionFrequencyClick = () => {
        setInspectionFrequencyEditing(false);
        handleSaveClick().then();
    }

    return (
        <div className="info-block">
            <span className="field-name-span">Общая информация</span>

            <div>
               <span className="data-line">
                   <span className="line-header">Название:&nbsp;</span>

                   {
                       isTemplateNameEditing ?
                           <span className="data-block">
                               <Maskinput
                                   onChange={setTemplateName}
                                   value={template.template_name}
                               />
                               <img className="edit-image" src={saveIcon} alt="Ошибка"
                                    onClick={handleSaveTemplateNameDataClick}/>
                           </span>
                           :
                           <span className="data-block">
                               <span>{template.template_name}</span>
                               <img className="edit-image" src={editIcon} alt="Ошибка"
                                    onClick={handleTemplateNameEditClick}/>
                           </span>
                   }
                </span>
            </div>

            <div>
               <span className="data-line">
                   <span className="line-header">Продолжительность наблюдения:&nbsp;</span>

                   {
                       isObservationPeriodEditing ?
                           <span className="data-block">
                               <Maskinput
                                onChange={setObservationPeriod}
                                value={template.observation_period}
                               />
                               <img className="edit-image" src={saveIcon} alt="Ошибка"
                                 onClick={handleSaveObservationPeriodClick}/>
                           </span>
                           :
                           <span className="data-block">
                               <span>
                                   {template.observation_period} {getObservationText(template.observation_period)}
                               </span>
                               <img className="edit-image" src={editIcon} alt="Ошибка"
                                    onClick={handleObservationPeriodEditClick}/>
                           </span>
                   }
               </span>
            </div>

            <div>
               <span className="data-line">
                   <span className="line-header">Периодичность осмотров:&nbsp;</span>

                   {
                       isInspectionFrequencyEditing ?
                           <span className="data-block">
                               <Maskinput
                                   onChange={setInspectionFrequency}
                                   value={template.inspections_frequency}
                               />
                               <img className="edit-image" src={saveIcon} alt="Ошибка"
                                    onClick={handleSaveInspectionFrequencyClick}/>
                           </span>
                           :
                           <span className="data-block">
                               <span>
                                   {template.inspections_frequency} {getInspectionsText(template.inspections_frequency)}
                               </span>
                               <img className="edit-image" src={editIcon} alt="Ошибка"
                                    onClick={handleInspectionFrequencyEditClick}/>
                           </span>
                   }
               </span>
            </div>
        </div>
    );
};

export default MainInfoComponent;

function getInspectionsText(value) {
    let mod100 = value % 100;
    let mod10 = value % 10;

    let res;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9)) {
        res = "раз";
    }
    else if (mod10 >= 2 && mod10 <= 4) {
        res = "раза";
    }
    else {
        res = "раз";
    }

    return res + ' в год';
}

function getObservationText(value) {
    let mod100 = value % 100;
    let mod10 = value % 10;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9)) {
        return "лет";
    }
    else if (mod10 >= 2 && mod10 <= 4) {
        return "года";
    }
    else {
        return  "год";
    }
}