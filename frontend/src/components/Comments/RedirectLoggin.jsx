import LoginButton from "../Navbar/LoginButton"

const RedirectLoggin = () =>{
    return(
        <div className="not__session">
            <h5>Para poder comentar necesitas iniciar sesión</h5>
            <LoginButton />
        </div>
    )
}

export default RedirectLoggin;