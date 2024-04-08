import useAuth from "../../hooks/useAuth";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavBar = () =>{
    const {authData, isGuest} = useAuth();
    return (
        <>
            <div className="navbar">
                <div className="userdata-container">
                    <div className="userdata-img">
                        <img src={authData.avatarUrl} alt={authData.user} />
                    </div>
                    <div className="userdata-name">
                        <p>{authData.user}</p>
                    </div>
                </div>

                <div className="navbar-buttons">
                    {isGuest ? <LoginButton /> : <LogoutButton />}
                </div>
            </div>
        </>
    )
}

export default NavBar;

