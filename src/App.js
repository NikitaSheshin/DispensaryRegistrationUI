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
import SelectTemplatePage from "./Template/SelectTemplatePage/SelectTemplatePage";
import InspectionSearchPage from "./Inspections/InspectionsSearchPage/InspectionSearchPage";
import AddVisitComponent from "./Visits/AddVisitComponent";
import VisitComponent from "./Visits/VisitComponent";
import TodayReceptionComponent from "./Reception/TodayReceptionComponent";

export const AuthContext = createContext({
    token: '',
    setToken: () => { },
});

export default function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        document.title = "Диспансерный учет";
    }, [])

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <Router>
            <AuthContext.Provider value={{token, setToken}}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path='/selectTemplate/:doctorId' element={<SelectTemplatePage/>}/>

                    <Route element={<PrivateRoute/>}>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/templateSearch" element={<TemplateSearch/>}/>
                        <Route path="/createTemplate" element={<CreateTemplatePage/>}/>
                        <Route path="/templates/:id" element={<TemplateDetailsPage/>}/>
                        <Route path="/templates/:id/edit" element={<EditTemplatePage/>}/>
                        <Route path="/patientSearch" element={<PatientSearchComponent/>}/>
                        <Route path="/addPatient" element={<PatientAddComponent/>}/>
                        <Route path="/patients/:id" element={<PatientDetailsComponent/>}/>
                        <Route path="/inspectionSearch" element={<InspectionSearchPage/>}/>
                        <Route path="/visit" element={<AddVisitComponent/>}/>
                        <Route path="/visits/:id" element={<VisitComponent/>}/>
                        <Route path="/reception" element={<TodayReceptionComponent/>}/>
                    </Route>
                </Routes>

            </AuthContext.Provider>
        </Router>
    );
}

// const PrivateRoute = () => {
//     const { token } = useContext(AuthContext);
//     const location = useLocation();
//
//     return (
//         token !== '' ?
//             <Outlet />
//             :
//             <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

const PrivateRoute = () => {
    const { token } = useContext(AuthContext);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                if (token) {
                    const response = await fetch("http://localhost:8083/checkAuth", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body:
                            JSON.stringify({token})
                    });

                    const fetchedTemplates = await response.json();
                    console.log(fetchedTemplates)
                    setIsAuthenticated(fetchedTemplates.valid);
                }
            } catch (error) {
                console.error('Ошибка при проверке токена:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUser().then(r => console.log(r));
    }, [token]);

    if (isLoading) {
        // Если проверка токена еще не завершена, показываем загрузочный индикатор или что-то подобное
        return <div>Loading...</div>;
    }

    console.log(isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}