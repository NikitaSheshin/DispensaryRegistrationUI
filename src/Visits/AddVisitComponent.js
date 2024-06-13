import {useLocation, useNavigate} from "react-router-dom";
import {getDoctorName} from "../Doctor/DoctorsScripts";
import React, {useState} from "react";
import Header from "../Header";
import DiseaseShowLabel from "../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";

let userData;

const AddVisitComponent = () => {
    const location = useLocation();
    userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData)
    let patientId = location.state.patientId;
    let template = location.state.template;
    let diseases = template.diseasesNames;

    const [comment, setComment] = useState("");
    const navigate = useNavigate();

    const completeVisit = async () => {
        const url = "http://localhost:8087/visits";

        const currentDate = new Date();

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: patientId,
                    doctorId: userData.id,
                    comments: comment,
                    visitDate: formatDate(currentDate)
                }),
            });
        } catch (error) {

        }

        try {
            await fetch("http://localhost:8084/templates/updateObservationDate", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: patientId,
                    doctorId: userData.id,
                    nextObservationDate: formatDate(nextObservationDate)
                }),
            });
        } catch(error) {

        }

        navigate('/patients/' + patientId, { state: { userData: userData } });
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // +1, так как месяцы начинаются с 0
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    function getNextObservationDate(n) {
        // Получаем текущую дату
        var today = new Date();
        // Рассчитываем длину каждой части года
        var partLength = Math.floor(365 / n);

        var futureDate = new Date(today.getTime() + partLength * 24 * 60 * 60 * 1000);
        return futureDate.toLocaleString("ru");
    }

    const [nextObservationDate, setNextObservationDate] = useState(makeDate(getNextObservationDate(template.inspectionsFrequency)));

    function handleDateChange(date) {
        setNextObservationDate(date);
    }

    return (
        <div id="search-page">
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}></Header>
            <hr/>

            <div id="page-content">
                <h1 id="page-header">Осмотр</h1>

                <div>
                    <span>Шаблон: </span>
                    <span>{template.templateName}</span>
                </div>

                <span className="field-name-span">Заболевания</span>

                {
                    diseases.map((disease) => (
                        <DiseaseShowLabel
                            shownValue={disease}
                        />
                    ))
                }

                <div>
                    <span>Комментарий</span> <br/>
                    <textarea rows="4" cols="50" onChange={
                        event => setComment(event.target.value)
                    }/>
                </div>

                <div>
                    <span>Дата следующего осмотра: </span>

                    <DatePicker
                        className="input-field"
                        selected={nextObservationDate}
                        onChange={handleDateChange}
                        dateFormat="dd.MM.yyyy"
                        locale={ru}
                    />

                    {/*<span>{makeDate(getNextObservationDate(template.inspectionsFrequency))}</span>*/}
                </div>

                <button className='create-patient-button'
                        onClick={completeVisit}>
                    Сохранить
                </button>
            </div>
        </div>
    );
};

export default AddVisitComponent;

const makeDate = (date) => {
    let dateString = date.toString();

    dateString = dateString.split(',')[0]

    const [day, month, year] = dateString.split('.');

    return new Date(year, month - 1, day);

    // let parts = dateString.split(',')[0].split('-')
    //
    // return parts[2] + '.' + parts[1] + '.' + parts[0]
}