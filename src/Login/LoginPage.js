import React, {useContext, useState} from "react";
import { useNavigate  } from "react-router-dom";
import './LoginPage.css'
import {AuthContext} from "../App";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {setToken} = useContext(AuthContext);

    const handleLogin = async () => {
        const url = "http://localhost:8083/auth";
        const params = {
            login: username,
            password: password
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers': 'Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(params)
            });

            if (!response.ok) {
                setErrorMessage('Введен неверный логин или пароль');
                return;
            }

            setErrorMessage('');

            const data = await response.json();
            setToken(data.token);
            navigate('/reception', {state: {userData: data}});
        } catch (error) {
            console.error('Произошла ошибка:', error);
            setErrorMessage('Произошла ошибка при входе');
        }
    };

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('password-input');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };

    return (
        <div id="login-container">
            <h1 id="authHeader" className="text">Авторизация</h1>
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            <form id="auth-form">
                <label className="auth-Login">
                    <input
                        placeholder="Логин"
                        className="auth-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className="auth-Login">
                    <div className="password-input-container">
                        <input
                            id="password-input"
                            placeholder="Пароль"
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="password-toggle" onClick={togglePasswordVisibility}>
                            👁️
                        </span>
                    </div>
                </label>

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
            <LoginForm />
        </div>
    );
}
