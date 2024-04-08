import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background";
const Register = () => {
    const URL_API = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}${process.env.SV_PATH}/signup`;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleName = (e) => {
        setUsername(e.target.value.toLowerCase().trim());
    }

    const handleEmail = (e) => {
        setEmail(e.target.value.toLowerCase().trim());
    }

    const handlePwd = (e) => {
        setPwd(e.target.value.toLowerCase().trim());
    }

    const handleAvatar = (e) => {
        setAvatarUrl(e.target.value.toLowerCase().trim());
    }

    const handleErrorMessage = (message) => {
        setErrorMessage(message);
    }

    const handleForm = async (e) => {
        e.preventDefault();
        const errorMessage = document.getElementById('registerError');
        try {
            const response = await fetch(URL_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    pwd: pwd, // Corregido: Asegúrate de que todos los campos estén configurados consistentemente
                    avatarUrl: avatarUrl
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                errorMessage.classList.add('success')
                errorMessage.style.display = 'block';
                errorMessage.textContent = data.message;
            } else {
                errorMessage.style.display = 'block';
                errorMessage.textContent = data.message;
                return;
            }

            setTimeout(() => {
                navigate('/signin')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Background />
            <div className="register-container">
                <div className="register-div">
                    <div className="register-image">
                        <img src="/register-img.svg" alt="" />
                    </div>
                    <form className="register-form">
                        <div className="register-container-input">
                            <label htmlFor="registerName">Nombre de usuario:</label>
                            <input
                                onChange={handleName}
                                type="text"
                                id="registerName" />
                        </div>
                        <div className="register-container-input">
                            <label htmlFor="registerEmail">Correo electronico:</label>
                            <input
                                onChange={handleEmail}
                                type="email"
                                id="registerEmail" />
                        </div>
                        <div className="register-container-input">
                            <label htmlFor="registerPwd">Clave: </label>
                            <input
                                onChange={handlePwd}
                                type="password"
                                id="registerPwd" />
                        </div>
                        <div className="register-container-input">
                            <label htmlFor="registerAvatarUrl">Foto de perfil: </label>
                            <input
                                onChange={handleAvatar}
                                type="text"
                                id="registerAvatarUrl" />
                        </div>
                        <div id="registerError" className="register-error"></div>
                        <div className="register-button">
                            <div>
                                <Link to="/signin">Ya tienes una cuenta?</Link>
                            </div>
                            <button onClick={handleForm}>Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default Register