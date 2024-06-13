import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getDiseases} from "../../DiseaseComponents/DiseasesScripts";
import Header from "../../Header";
import DiseaseLabel from "../../DiseaseComponents/DiseaseLabelComponent/DiseaseLabel";
import DiseaseComponent from "../../DiseaseComponents/DiseaseSelectorComponent/DiseaseComponent";
import PatientInputField from "./PatientInputField";
import {getDoctorName} from "../../Doctor/DoctorsScripts";
import PatientDatePicker from "./PatientDatePicker";
import './PatientAddStyles.css';
import MaskInputField from "./MaskInputField";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

const PatientAddComponent = () => {
    const navigate = useNavigate();
    const deleteDiseaseHandler = (indexOfDisease) => {
        const newSelectedDiseases = [...selectedDiseases];
        newSelectedDiseases.splice(indexOfDisease, 1);
        setSelectedDiseases(newSelectedDiseases);

        const newSelectedDiseasesObjects = [...selectedDiseasesObjects];
        newSelectedDiseasesObjects.splice(indexOfDisease, 1);
        setSelectedDiseasesObjects(newSelectedDiseasesObjects);
    };

    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getDiseases();
        };

        fetchDiseases().then(response => setDiseases(response));
    }, []);

    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData);

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [passportData, setPassportData] = useState('');
    const [snilsNumber, setSnilsNumber] = useState('');
    const [omsPolicy, setOmsPolicy] = useState('');

    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [addressErrorMessage, setAddressErrorMessage] = useState('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');
    const [genderErrorMessage, setGenderErrorMessage] = useState('');

    const addPatient = async () => {
        const errors = {};

        if (!firstName) errors.firstName = 'Поле должно быть заполнено';
        if (!lastName) errors.lastName = 'Поле должно быть заполнено';
        if (!birthday) errors.birthday = 'Поле должно быть заполнено';
        if (!address) errors.address = 'Поле должно быть заполнено';
        if (!phoneNumber) errors.phoneNumber = 'Поле должно быть заполнено';
        if (!document.getElementById("man").checked
            && !document.getElementById("woman").checked)
            errors.gender = 'Пол не указан';

        if (Object.keys(errors).length > 0) {
            setFirstNameErrorMessage(errors.firstName || '');
            setLastNameErrorMessage(errors.lastName || '');
            setBirthdayErrorMessage(errors.birthday || '');
            setAddressErrorMessage(errors.address || '');
            setPhoneNumberErrorMessage(errors.phoneNumber || '');
            setGenderErrorMessage(errors.gender || '');
            return;
        }

        const url = "http://localhost:8086/patients";

        let uniqueDiseases = selectedDiseasesObjects.map(el => el.id);

        let sendBody;

        if (selectedTemplate === null) {
            sendBody = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                diseases: uniqueDiseases,
                observed: false,
                passportNumber: passportData.toString().split(' ')[1],
                passportSeries: passportData.toString().split(' ')[0],
                snilsNumber: snilsNumber,
                omsPolicy: omsPolicy,
                gender: document.getElementById("man").checked
            })
        } else {
            sendBody = JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                diseases: uniqueDiseases,
                observed: true,
                passportNumber: passportData.toString().split(' ')[1],
                passportSeries: passportData.toString().split(' ')[0],
                snilsNumber: snilsNumber,
                omsPolicy: omsPolicy,
                gender: document.getElementById("man").checked,
                template: {
                    templateId: selectedTemplate.id,
                    doctorId: userData.id
                }
            })
        }

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: sendBody,
            });
        } catch (error) {

        }

        navigate('/patientSearch', {state: {userData: userData}});
    };

    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [selectedDiseasesObjects, setSelectedDiseasesObjects] = useState([]);

    const diseaseChange = (selectedDisease) => {
        setSelectedDiseases([...selectedDiseases, selectedDisease]);
        setSelectedDiseasesObjects([...selectedDiseasesObjects,
            diseases.find(d => d.icd_id === selectedDisease)]);
    };

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const openTemplateWindow = () => {
        const templateWindow = window.open("/selectTemplate/" + userData.id, "_blank", "width=500,height=500");

        window.addEventListener('message', (event) => {
            if (event.source === templateWindow) {
                console.log('Получен результат от открытой страницы:', event.data);
                setSelectedTemplate(event.data);
            }
        });
    };

    const resetTemplate = () => {
        setSelectedTemplate(null);
    };

    return (
        <div>
            <Header
                doctorName={doctorName}
                doctorSpecialty={userData.specialty}
                selectedMenuItem="reception"
            />
            <hr/>

            <div id="page-content">
                <h1 id="page-header">Новый пациент</h1>

                <form>
                    <PatientInputField
                        onChange={setLastName}
                        fieldName="Фамилия"
                        errorMessage={lastNameErrorMessage}
                    />

                    <PatientInputField
                        onChange={setFirstName}
                        fieldName="Имя"
                        errorMessage={firstNameErrorMessage}
                    />

                    <PatientInputField onChange={setPatronymic} fieldName="Отчество"/>

                    <div className="input-block">
                        <span className="field-name-span">Пол</span>
                        <div>
                            {genderErrorMessage && <p style={{color: 'red'}}>{genderErrorMessage}</p>}
                            <input id="man" type="radio" name="question"/>
                            <label className="gender-text" htmlFor="man">Мужской</label>

                            <input id="woman" type="radio" name="question"/>
                            <label className="gender-text" htmlFor="woman">Женский</label>
                        </div>
                    </div>

                    <PatientDatePicker
                        onChange={setBirthday}
                        fieldName="Дата рождения"
                        errorMessage={birthdayErrorMessage}
                    />

                    <div className="input-block">
                        <span className="field-name-span">Адрес</span>
                        <div>
                            {addressErrorMessage && <p style={{color: 'red'}}>{addressErrorMessage}</p>}
                            <AddressSuggestions
                                token="4e2f0778a64e600711473b72450305c1c973a412"
                                value={address}
                                onChange={setAddress}
                            />
                        </div>
                    </div>


                    <MaskInputField
                        onChange={setPhoneNumber}
                        fieldName="Телефон"
                        errorMessage={phoneNumberErrorMessage}
                        mask="+7(999) 999 99-99"
                        placeholder="+7(123) 456 789"
                    />

                    <MaskInputField
                        onChange={setPassportData}
                        fieldName="Серия и номер паспорта"
                        mask="9999 999999"
                        placeholder="1111 111111"
                    />
                    <MaskInputField
                        onChange={setSnilsNumber}
                        fieldName="Номер СНИЛС"
                        mask="999-999-999 99"
                        placeholder="111-111-111 11"
                    />

                    <MaskInputField
                        onChange={setOmsPolicy}
                        fieldName="Полис ОМС"
                        mask="9999999999999999"
                        placeholder="1111111111111111"
                    />

                    <div className="input-block">
                        <span className="field-name-span">Заболевания</span>

                        <div>
                            {
                                selectedDiseases
                                .filter((disease, index, array) => array.indexOf(disease) === index)
                                .map((uniqueDisease, index) => (
                                    <DiseaseLabel
                                        key={uniqueDisease}
                                        shownValue={uniqueDisease}
                                        deleteDiseaseHandler={() => deleteDiseaseHandler(index)}
                                    />
                                ))
                            }
                            <DiseaseComponent onChange={diseaseChange} diseases={diseases}/>
                        </div>
                    </div>
                </form>
                {/*{selectedTemplate == null ? (<div>*/}
                {/*            <button className='create-patient-button'*/}
                {/*                    onClick={openTemplateWindow}>*/}
                {/*                Добавить существующий шаблон*/}
                {/*            </button>*/}
                {/*            <button className='create-patient-button'>Добавить новый шаблон</button>*/}
                {/*        </div>*/}
                {/*    ) :*/}
                {/*    (<div>*/}
                {/*        <span>{selectedTemplate.template_name}</span>*/}
                {/*        <span onClick={resetTemplate}>Удалить</span>*/}
                {/*    </div>)*/}
                {/*}*/}

                <div id="add-patient-div">
                    <button className="create-patient-button" onClick={addPatient}>Сохранить</button>
                </div>
            </div>
        </div>
    );
};

export default PatientAddComponent;