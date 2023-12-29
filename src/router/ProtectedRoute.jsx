import { useEffect, useState } from 'react'
import { useIsLogged } from '../hooks/useIslogged'
import '../style/ProtectedRoutes.css'
import { Route } from 'react-router-dom'

const Checkeando = () => {
    return (
        <div>checkin user logged</div>
    )
}



function ProtectedRoute({ children }) {
    const [isChecking, setIsChecking] = useState(false)
    const { isLogged } = useIsLogged()

    useEffect(() => {
        setIsChecking(true)
        const checkLogged = async () => {
            await isLogged()
        }
        checkLogged()
        setIsChecking(false)
    }, [])

    return (
        <>
            {
                isChecking
                    ? <Checkeando />
                    : children
            }

        </>
    )

}

export default ProtectedRoute