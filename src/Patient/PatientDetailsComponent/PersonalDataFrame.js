import React, {useEffect, useState} from 'react';
import '../../TemplateSearchPage/Search.css'
import editIcon from "../../resources/edit_icon.png";
import saveIcon from "../../resources/save_icon.png";
import Maskinput from "./Documents/Maskinput";
import {AddressSuggestions} from "react-dadata";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import {format} from "date-fns";

const PersonalDataFrame = ( {patient} ) => {
    const [isEditing, setEditing] = useState(false)

    const [lastName, setLastName] = useState(patient.lastName);
    const [firstName, setFirstName] = useState(patient.firstName);
    const [patronymic, setPatronymic] = useState(patient.patronymic);
    const [birthday, setBirthday] = useState(patient.birthday);
    const [address, setAddress] = useState(patient.address);
    const [phoneNumber, setPhoneNumber] = useState(patient.phoneNumber);

    useEffect(() => {
        setLastName(patient.lastName);
        setFirstName(patient.firstName);
        setPatronymic(patient.patronymic);
        setBirthday(patient.birthday);
        setAddress(patient.address);
        setPhoneNumber(patient.phoneNumber);
    }, [patient.address, patient.birthday, patient.firstName, patient.lastName, patient.patronymic, patient.phoneNumber]);
    
    const addressSuggestion = {
        value: patient.address,
        unrestricted_value: patient.address,
        data: {
            postal_code: '',
            country: '',
            country_iso_code: '',
            federal_district: '',
            region_fias_id: '',
            region_kladr_id: '',
            region_with_type: '',
            region_type: '',
            region_type_full: '',
            region: '',
        }
    };

    const handleEditDataClick = () => {
        setEditing(true);
    }

    const handleSaveDataClick = async () => {
        setEditing(false);

        patient.lastName = lastName || patient.lastName;
        patient.firstName = firstName || patient.firstName;
        patient.patronymic = patronymic || patient.patronymic;
        patient.address = address !== undefined ?
            address : patient.address;
        patient.phoneNumber = phoneNumber || patient.phoneNumber;
        patient.birthday = format(birthday, 'yyyy-MM-dd') || patient.birthday;

        const url = "http://localhost:8086/patients";

        let sendBody = JSON.parse(JSON.stringify(patient));
        sendBody.diseases = patient.diseases.map((disease) => disease.id);

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

    return (
        <>
            {
                isEditing ?
                    <div className="patient-name-block">
                        <div>
                            <div>
                                <span>Фамилия</span>
                                <Maskinput
                                    onChange={setLastName}
                                    value={patient.lastName}
                                    placeholder="Иванов"
                                />
                            </div>

                            <div>
                                <span>Имя</span>
                                <Maskinput
                                    onChange={setFirstName}
                                    value={patient.firstName}
                                    placeholder="Иван"
                                />
                            </div>

                            <div>
                                <span>Отчество</span>
                                <Maskinput
                                    onChange={setPatronymic}
                                    value={patient.patronymic}
                                    placeholder="Иванович"
                                />
                            </div>

                            <div>
                                <span>Дата рождения</span>
                                <DatePicker
                                    className="input-data-field"
                                    selected={birthday}
                                    onChange={setBirthday}
                                    dateFormat="dd.MM.yyyy"
                                    locale={ru}
                                />
                            </div>

                            <div id='address-block'>
                                <span>Адрес</span>
                                <AddressSuggestions
                                    token="4e2f0778a64e600711473b72450305c1c973a412"
                                    value={addressSuggestion}
                                    onChange={setAddress}
                                />
                            </div>

                            <div>
                                <span>Телефон</span>
                                <Maskinput
                                    onChange={setPhoneNumber}
                                    value={patient.phoneNumber}
                                    mask="+7(999) 999 99-99"
                                    placeholder="+7(123) 456 789"
                                />
                            </div>
                        </div>
                        <img className="edit-image" src={saveIcon} alt="Ошибка" onClick={handleSaveDataClick}/>
                    </div>
                    :
                    <div className="patient-name-block">
                        <div>
                            <div>
                                {patient.lastName} {patient.firstName} {patient.patronymic},&nbsp;
                                {makeDate(patient.birthday)} ({getDateWithDeclination(patient.birthday)})&nbsp;
                                {patient.gender ? <span>(МУЖ)</span> : <span>(ЖЕН)</span>}
                            </div>
                            <div>{patient.address}, {patient.phoneNumber}</div>
                        </div>

                        <img className="edit-image" src={editIcon} alt="Ошибка" onClick={handleEditDataClick}/>
                    </div>
            }
        </>
    );
};

export default PersonalDataFrame;

const makeDate = (date) => {
    if(date === undefined) {
        return ""
    }

    let dateString = date.toString();
    let parts = dateString.split('-')

    return parts[2] + '.' + parts[1] + '.' + parts[0]
}

const getDateWithDeclination = (birthday) => {
    let years = getYearsBetweenDates(birthday);

    let mod100 = years % 100;
    let mod10 = years % 10;

    if ((mod100 >= 11 && mod100 <= 14) ||
        (mod10 >= 5 && mod10 <= 9))
        return years + " лет";
    else if (mod10 >= 2 && mod10 <= 4)
        return years + " года";
    else
        return years + " год";
}

const getYearsBetweenDates = (birthday) => {
    let currentDate = new Date();
    let givenDate = new Date(birthday);
    let difference = currentDate - givenDate;

    return Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
}