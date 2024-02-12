import Header from "../../Header";
import MainMenu from "../../Menu/MainMenu";
import {useLocation} from "react-router-dom";
import {useParams} from "react-router";
import {getDoctorName} from "../../Doctor/DoctorsScripts";
import React, {useEffect, useState} from "react";
import {getPatientFromServer} from "../PatientScripts";
import DiseaseShowLabel from "../../DiseaseComponents/DiseaseShowLabel/DiseasesShowLabel";
import PatientInfoField from "./PatientInfoField";


const PatientDetailsComponent = () => {
    const location = useLocation();
    let userData = location.state && location.state.userData;
    let doctorName = getDoctorName(userData);

    const {id} = useParams();

    const [patient, setPatient] = useState([]);
    const [diseases, setDiseases] = useState([]);

    useEffect(() => {
        const fetchDiseases = async () => {
            return await getPatientFromServer(id);
        };

        fetchDiseases().then(
            data => {
                setPatient(data);
                setDiseases(data.diseases)
            }
        );
    }, [id]);

    return (
      <div>
          <Header doctorName={doctorName} doctorSpecialty={userData.specialty}/>
          <MainMenu userData={userData}/>

          <div id="page-content">
              <h1 id="page-header">Пациент</h1>

              <PatientInfoField fieldName="Фамилия" fieldValue={patient.lastName}/>
              <PatientInfoField fieldName="Имя" fieldValue={patient.firstName}/>
              {
                  patient.patronymic &&
                  <PatientInfoField fieldName="Отчетсво" fieldValue={patient.patronymic}/>
              }

              <PatientInfoField fieldName="Дата рождения" fieldValue={patient.birthday}/>

              <PatientInfoField fieldName="Адрес" fieldValue={patient.address}/>

              <PatientInfoField fieldName="Номер телефона" fieldValue={patient.phoneNumber}/>

              {diseases.length > 0 &&
                  <span className="field-name-span">Заболевания</span>}
              {diseases.length > 0 &&
                  <br/>}

              {
                  diseases.length > 0 &&
                  diseases.map((disease) => (
                      <DiseaseShowLabel
                          shownValue={disease.disease_name}
                      />
                  ))
              }

              <br/>

              {/*<div id="floating-button">*/}
              {/*    <EditTemplateButton template={template}></EditTemplateButton>*/}
              {/*    <DeleteTemplateButton/>*/}
              {/*</div>*/}
          </div>
      </div>
    );
};

export default PatientDetailsComponent;