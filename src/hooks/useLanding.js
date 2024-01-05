import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContextB"

export function useLanding() {
    const isLanding = sessionStorage.getItem('landing') ? false : true
    const [landingSt, setLandingSt] = useState(isLanding)
    const { setToken } = useContext(UserContext)

    useEffect(() => {
        const landingTimeOut = setTimeout(() => {
            if (isLanding) {
                sessionStorage.setItem('landing', false)
                setLandingSt(sessionStorage.getItem('landing') ? false : true)
                clearTimeout(landingTimeOut)
            }
        }, 5000);
        setToken(sessionStorage.getItem('token'))
    }, [])

    return { landingSt }
}