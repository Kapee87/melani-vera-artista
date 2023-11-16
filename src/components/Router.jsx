import { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserContext } from '../context/userContext.jsx'
import { Contacto } from '../pages/Contacto.jsx'
import { Expos } from '../pages/Expos.jsx'
import SignIn from '../pages/SignIn.jsx'
import { SobreMi } from '../pages/SobreMi.jsx'
import { Trabajos } from '../pages/Trabajos.jsx'
import { Layout } from './Layout.jsx'
import axios from 'axios'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import NewWork from '../pages/new entries forms/NewWork.jsx'
import NewExpo from '../pages/new entries forms/newExpo.jsx'


export default function Router() {
    const { userData, setUserData } = useContext(UserContext)
    const token = sessionStorage.getItem('token')
    // console.log(token);
    useEffect(() => {
        async function loadaxios() {
            try {
                const { data } = await axios.post('https://melvera-api.onrender.com/api/auth/token', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.log(data.user);
                const verObj = { ...data.user, 'online': true }
                setUserData(verObj)
                // console.log(userData)
            } catch (error) {
                console.log(error)
                sessionStorage.removeItem('token')
                setUserData(null)
            }
        }
        token
            ? loadaxios()
            : setUserData(null)
        // console.log(userData);
    }, [])

    //useEffect para ver el estado userData
    /* useEffect(() => {
        console.log(userData)
    }, [userData]) */


    return (
        <Suspense fallback={<h3>Cargando...</h3>}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        **<Route index element={<Trabajos />} />**
                        <Route path='trabajos' element={<Trabajos />} />
                        <Route path='exposiciones' element={<Expos />} />
                        <Route path='contacto' element={<Contacto />} />
                        <Route path='sobre-mi' element={<SobreMi />} />
                        <Route path='nuevo-trabajo' element={<NewWork />} />
                        <Route path='nueva-exposicion' element={<NewExpo />} />
                    </Route>
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/admin' element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
        </Suspense >
    )
}


