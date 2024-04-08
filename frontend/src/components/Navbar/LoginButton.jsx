import {
    Link,
    useNavigate
 } from 'react-router-dom';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import useAuth from '../../hooks/useAuth';

const LoginButton = () =>{
    const navigate = useNavigate();
    const { authLogout } = useAuth();
    const handleRedirect = (e) =>{
        e.preventDefault();

        authLogout();
        navigate('/signin')
    }
    return(
            <Link className='navbar-login' onClick={handleRedirect}>
                <PersonAddRoundedIcon />
                Iniciar Sesión
            </Link>
    )
}

export default LoginButton;