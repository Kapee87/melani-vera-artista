import { Suspense, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Contacto } from '../pages/Contacto.jsx'
import { Expos } from '../pages/Expos.jsx'
import SignIn from '../pages/SignIn.jsx'
import { SobreMi } from '../pages/SobreMi.jsx'
import { Trabajos } from '../pages/Trabajos.jsx'
import { Layout } from '../components/Layout.jsx'
import axios from 'axios'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import NewWork from '../pages/new entries forms/NewWork.jsx'
import NewExpo from '../pages/new entries forms/NewExpo.jsx'
import { UserContext } from '../context/UserContextB.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { urlToken } from '../utils/urlStore.js'
import ExpoDetails from '../pages/ExpoDetails.jsx'



export default function Router() {
    const { userData, setUserData } = useContext(UserContext)
    const token = sessionStorage.getItem('token')
    // console.log(token);
    useEffect(() => {
        async function loadaxios() {
            try {
                const { data } = await axios.post(urlToken, {}, {
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
                        <Route path='crear-trabajo' element={<ProtectedRoute component={NewWork} />} />
                        <Route path='nueva-exposicion' element={<ProtectedRoute component={NewExpo} />} />
                        <Route path='expo/:id' element={<ProtectedRoute component={ExpoDetails} />} />
                        <Route path='/admin' element={<ProtectedRoute component={AdminDashboard} />} />
                    </Route>
                    <Route path='/signin' element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </Suspense >
    )
}


