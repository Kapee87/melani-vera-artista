import { createContext, useEffect, useState } from "react";


export const UserContext = createContext({
    userData: null,
    setUserData: () => { },
    token: null
})

export const UserContextProvider = ({ children, initial = {} }) => {
    const [userData, setUserData] = useState(initial)
    const [token, setToken] = useState(sessionStorage.getItem('token'))

    return (
        <UserContext.Provider value={{ userData, setUserData, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}