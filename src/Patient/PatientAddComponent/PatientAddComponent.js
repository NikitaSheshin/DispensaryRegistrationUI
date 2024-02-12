import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getDiseases} from "../../DiseaseComponents/DiseasesScripts";
import Header from "../../Header";
import MainMenu from "../../Menu/MainMenu";
import DiseaseLabel from "../../DiseaseComponents/DiseaseLabelComponent/DiseaseLabel";
import DiseaseComponent from "../../DiseaseComponents/DiseaseSelectorComponent/DiseaseComponent";
import PatientInputField from "./PatientInputField";
import {getDoctorName} from "../../Doctor/DoctorsScripts";
import PatientDatePicker from "./PatientDatePicker";
import './PatientAddStyles.css';

const PatientAddComponent = () => {
    const navigate = useNavigate();
    const deleteDiseaseHandler =  (indexOfDisease) => {
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
    const[patronymic, setPatronymic] = useState('');

    const[address, setAddress] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState(null);

    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [addressErrorMessage, setAddressErrorMessage] = useState('');
    const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState('');
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState('');


    const addPatient = async () => {
        const errors = {};

        if (!firstName) errors.firstName = 'Поле должно быть заполнено';
        if (!lastName) errors.lastName = 'Поле должно быть заполнено';
        if (!birthday) errors.birthday = 'Поле должно быть заполнено';
        if (!address) errors.address = 'Поле должно быть заполнено';
        if (!phoneNumber) errors.phoneNumber = 'Поле должно быть заполнено';

        if (Object.keys(errors).length > 0) {
            setFirstNameErrorMessage(errors.firstName || '');
            setLastNameErrorMessage(errors.lastName || '');
            setBirthdayErrorMessage(errors.birthday || '');
            setAddressErrorMessage(errors.address || '');
            setPhoneNumberErrorMessage(errors.phoneNumber || '');
            return;
        }

        const url = "http://localhost:8080/patients";

        let uniqueDiseases = selectedDiseasesObjects.map(el => el.id);

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    patronymic: patronymic,
                    birthday: birthday,
                    address: address,
                    phoneNumber: phoneNumber,
                    diseases: uniqueDiseases
                }),
            });
        } catch (error) {

        }

        navigate('/patientSearch', { state: { userData: userData } });
    };

    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [selectedDiseasesObjects, setSelectedDiseasesObjects] = useState([]);

    const diseaseChange = (selectedDisease) => {
        setSelectedDiseases([...selectedDiseases, selectedDisease]);
        setSelectedDiseasesObjects([...selectedDiseasesObjects,
            diseases.find(d => d.disease_name === selectedDisease)]);
    };

    return (
        <div>
            <Header doctorName={doctorName} doctorSpecialty={userData.specialty}/>
            <MainMenu userData={userData}/>

            <div id="page-content">
                <h1 id="page-header">Новый пациент</h1>

                <form>
                    <PatientInputField
                        onChange={setLastName}
                        fieldName="Фамилия"
                        errorMessage={lastNameErrorMessage}
                    />
                    <br/>

                    <PatientInputField
                        onChange={setFirstName}
                        fieldName="Имя"
                        errorMessage={firstNameErrorMessage}
                    />
                    <br/>

                    <PatientInputField onChange={setPatronymic} fieldName="Отчество"/>
                    <br/>

                    <PatientDatePicker
                        onChange={setBirthday}
                        fieldName="Дата рождения"
                        errorMessage={birthdayErrorMessage}
                    />
                    <br/>

                    <PatientInputField
                        onChange={setAddress}
                        fieldName="Адрес"
                        errorMessage={addressErrorMessage}
                    />
                    <br/>

                    <PatientInputField
                        onChange={setPhoneNumber}
                        fieldName="Телефон"
                        errorMessage={phoneNumberErrorMessage}
                    />
                    <br/>

                    <span className="field-name-span">Заболевания</span>
                    <br/>

                    {selectedDiseases
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
                </form>

                <button className='create-patient-button'>Добавить существующий шаблон</button>
                <button className='create-patient-button'>Добавить новый шаблон</button>

                <div id="add-patient-div">
                    <button className="create-patient-button" onClick={addPatient}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default PatientAddComponent;