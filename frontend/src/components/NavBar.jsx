import useAuth from "../hooks/useAuth";

const NavBar = () =>{
    const {authData, isGuest, authLogout} = useAuth();
    return (
        <>
            hola
        </>
    )
}

export default NavBar;

