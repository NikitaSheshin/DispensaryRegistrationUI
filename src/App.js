import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import Home from "./Home";
import TemplateSearch from "./TemplateSearchPage/TemplateSearch";
import CreateTemplatePage from "./CreateTemplate/CreateTemplatePage";
import TemplateDetailsPage from "./TemplatePage/TemplateDetailsPage";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/templateSearch" element={<TemplateSearch/>}/>
                <Route path="/createTemplate" element={<CreateTemplatePage/>}/>
                <Route path="/templates/:id" element={<TemplateDetailsPage/>}/>
            </Routes>
        </Router>
    );
}