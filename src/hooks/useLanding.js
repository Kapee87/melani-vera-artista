
import { useEffect, useRef, useState } from "react"

export function useLanding() {
    const landingRef = useRef(true)
    const [landingSt, setLandingSt] = useState(landingRef)

    useEffect(() => {
        const landingTimeOut = setTimeout(() => {
            landingRef.current = false
            setLandingSt(landingRef.current)
            clearTimeout(landingTimeOut)
        }, 5000);
    }, [])

    return { landingSt }
}