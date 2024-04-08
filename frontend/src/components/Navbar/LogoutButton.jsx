import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
    Link,
    useNavigate
} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const LogoutButton = () => {

    const { authLogout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault()

        authLogout();
        navigate('/signin')
    }

    return (
        <Link className='navbar-logout' onClick={handleLogout} to="/signin">
            <LogoutRoundedIcon />
            Cerrar Sesión
        </Link>
    )
}

export default LogoutButton;