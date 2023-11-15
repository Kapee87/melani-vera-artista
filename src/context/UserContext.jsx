import { createContext, useState } from "react";


export const UserContext = createContext({
    userData: null,
    setUserData: () => { }
})

export const UserContextProvider = ({ children, initial = {} }) => {
    const [userData, setUserData] = useState(initial)

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}