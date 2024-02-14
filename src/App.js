import React, {createContext, useContext, useEffect, useState} from "react";
import {Route, BrowserRouter as Router, Routes, useLocation, Outlet, Navigate} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Home from "./Home";
import TemplateSearch from "./TemplateSearchPage/TemplateSearch";
import CreateTemplatePage from "./CreateTemplatePage/CreateTemplatePage";
import TemplateDetailsPage from "./TemplatePage/TemplateDetailsPage";
import EditTemplatePage from "./EditTemplatePage/EditTemplatePage";
import PatientSearchComponent from "./Patient/PatientsSearch/PatientSearchComponent";
import PatientAddComponent from "./Patient/PatientAddComponent/PatientAddComponent";
import PatientDetailsComponent from "./Patient/PatientDetailsComponent/PatientDetailsComponent";


export const AuthContext = createContext({
    isAuthenticated: false,
    setAuth: () => { },
});

export default function App() {
    const [isAuthenticated, setAuth] = useState(() => {
        const authState = localStorage.getItem("isAuthenticated");
        return authState ? JSON.parse(authState) : false;
    });

    useEffect(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    return (
        <Router>
            <AuthContext.Provider value={{isAuthenticated, setAuth}}>

                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/login" element={<LoginPage/>}/>


                    <Route element={<PrivateRoute/>}>
                        <Route path="/templateSearch" element={<TemplateSearch/>}/>
                        <Route path="/createTemplate" element={<CreateTemplatePage/>}/>
                        <Route path="/templates/:id" element={<TemplateDetailsPage/>}/>
                        <Route path="/templates/:id/edit" element={<EditTemplatePage/>}/>
                        <Route path="/patientSearch" element={<PatientSearchComponent/>}/>
                        <Route path="/addPatient" element={<PatientAddComponent/>}/>
                        <Route path="/patients/:id" element={<PatientDetailsComponent/>}/>
                    </Route>
                </Routes>

            </AuthContext.Provider>
        </Router>
    );
}

const PrivateRoute = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    return (
        isAuthenticated === true ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    );
}