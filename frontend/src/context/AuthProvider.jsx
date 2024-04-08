import {
    useState,
    useEffect,
    createContext
} from 'react'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isGuest, setIsGuest] = useState(false);
    const [authData, setAuth] = useState({});

    const authLogin = (userData, isGuest) =>{
        setAuth(userData);
        setIsGuest(isGuest);
    }

    const authLogout = () =>{
        setAuth(null);
        setIsGuest(isGuest);
    }

    return (
        <AuthContext.Provider 
            value={{
                authData, authLogin, authLogout, isGuest
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;