import { createContext, useContext, useState } from "react"

export const AuthContext = createContext({});

export const AuthProvider = (props) => {

    const [user, setUser] = useState({
        nome: 'Pedro'
    })
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)