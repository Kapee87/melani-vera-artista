import { useEffect, useState } from 'react'
import { useIsLogged } from '../hooks/useIslogged'
import '../style/ProtectedRoutes.css'

const Checkeando = () => {
    return (
        <div>checkin user logged</div>
    )
}



function ProtectedRoute({ component: Component }) {
    const [isChecking, setIsChecking] = useState(false)
    const { isLogged } = useIsLogged()

    useEffect(() => {
        setIsChecking(true)
        isLogged()
        setIsChecking(false)
    }, [])
    
    return (
        <>
            {
                isChecking
                    ? <Checkeando />
                    : <Component />
            }

        </>
    )

}

export default ProtectedRoute