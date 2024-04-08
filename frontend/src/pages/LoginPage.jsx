import { useState } from 'react';
import {
    Link,
    useNavigate
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import Background from '../components/Background';

const Login = () => {
    const URL_API = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/signin`;
    const [inputLogin, setInputLogin] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const { authLogin } = useAuth();

    const handleName = (e) => {
        setInputLogin(e.target.value.toLowerCase().trim());
    }

    const handlePwd = (e) => {
        setPwd(e.target.value.toLowerCase().trim());
    }

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
    }

    const handleGuest = (e) => {
        e.preventDefault();
        localStorage.clear();
        const guestData = {
            avatarUrl: "https://img.freepik.com/foto-gratis/lindo-gato-relajante-estudio_23-2150692717.jpg",
            user: "Guest"
        }
        authLogin(guestData, true)
        navigate('/')
    }

    const handleForm = async (e) => {
        e.preventDefault();
        const errorMessage = document.getElementById('loginError');
        try {
            const response = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputLogin: inputLogin,
                    pwd: pwd,
                })
            });

            const data = await response.json();

            if (response.status != 200) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = data.message;
                return;
            }

            errorMessage.classList.add('success');
            errorMessage.style.display = 'block';
            errorMessage.textContent = data.message;

            localStorage.setItem('token', data.userData.token);
            authLogin(data.userData, false);

            setTimeout(() => {
                navigate('/')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Background />
            <div className="login-container">
                <div className="login-div">
                    <div className="login-image">
                        <img src="/register-img.svg" alt="" />
                    </div>
                    <form className="login-form">
                        <div className="login-container-input">
                            <label htmlFor="registerName">Nombre de usuario:</label>
                            <input
                                onChange={handleName}
                                type="text"
                                id="registerName" />
                        </div>
                        <div className="login-container-input">
                            <label htmlFor="registerEmail">Clave:</label>
                            <input
                                onChange={handlePwd}
                                type="email"
                                id="registerEmail" />
                        </div>
                        <div id="loginError" className="register-error"></div>
                        <div className="login-button">
                            <div>
                                <Link to="/signup">No tienes una cuenta?</Link>
                            </div>
                            <button onClick={handleForm}>Iniciar Sesión</button>
                        </div>
                        <div className='guest-option'>
                            <Link onClick={handleGuest}>Iniciar como invitado</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;