import React, {useContext, useState} from "react";
import { useNavigate  } from "react-router-dom";
import AuthHeader from "./AuthHeader";
import './LoginPage.css'
import {AuthContext} from "../App";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext);

    const handleLogin = async () => {
        const url = "http://localhost:8080/auth";
        const params = {
            login: username,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (response.status === 404) {
                setErrorMessage('Введен неверный логин или пароль');
                return;
            }

            setErrorMessage('');

            const data = await response.json();
            setToken(data.token);
            navigate('/templateSearch', { state: { userData: data } });
        } catch (error) {
            console.error('Произошла ошибка:', error);
            setErrorMessage('Произошла ошибка при входе');
        }
    };

    return (
        <div id="login-container">
            <h1 id="authHeader">Авторизация</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form id="auth-form">
                <label className="auth-Login">
                    <span>Логин</span>
                    <input
                        className="auth-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label className="auth-Login">
                    <span>Пароль</span>
                    <input
                        className="auth-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <button id="submit-button" type="button" onClick={handleLogin}>
                    Войти
                </button>
            </form>
        </div>
    );
};

export default function LoginPage() {
    return (
        <div id="loginPage">
            <AuthHeader />
            <LoginForm />
        </div>
    );
}
