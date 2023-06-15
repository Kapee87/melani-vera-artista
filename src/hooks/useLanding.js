import { useEffect, useState } from "react"

export function useLanding() {
    const isLanding = sessionStorage.getItem('landing') ? false : true
    const [landingSt, setLandingSt] = useState(isLanding)

    useEffect(() => {
        const landingTimeOut = setTimeout(() => {
            if (isLanding) {
                sessionStorage.setItem('landing', false)
                setLandingSt(sessionStorage.getItem('landing') ? false : true)
                clearTimeout(landingTimeOut)
            }
        }, 5000);
    }, [])

    return { landingSt }
}