import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Home from "./Home";
import TemplateSearch from "./TemplateSearchPage/TemplateSearch";
import CreateTemplatePage from "./CreateTemplatePage/CreateTemplatePage";
import TemplateDetailsPage from "./TemplatePage/TemplateDetailsPage";
import EditTemplatePage from "./EditTemplatePage/EditTemplatePage";
import PatientSearchComponent from "./Patient/PatientsSearch/PatientSearchComponent";
import PatientAddComponent from "./Patient/PatientAddComponent/PatientAddComponent";
import PatientDetailsComponent from "./Patient/PatientDetailsComponent/PatientDetailsComponent";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/templateSearch" element={<TemplateSearch/>}/>
                <Route path="/createTemplate" element={<CreateTemplatePage/>}/>
                <Route path="/templates/:id" element={<TemplateDetailsPage/>}/>
                <Route path="/templates/:id/edit" element={<EditTemplatePage/>}/>
                <Route path="/patientSearch" element={<PatientSearchComponent/>}/>
                <Route path="/addPatient" element={<PatientAddComponent/>}/>
                <Route path="/patients/:id" element={<PatientDetailsComponent/>}/>
            </Routes>
        </Router>
    );
}