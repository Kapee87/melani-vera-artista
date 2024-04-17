import { Suspense, lazy, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout.jsx'
import { UserContext } from '../context/UserContextB.jsx'
import { urlToken } from '../utils/urlStore.js'
import axios from 'axios'

export default function Router() {
    const ExpoDetails = lazy(() => import('../pages/ExpoDetails.jsx'))
    const NewWork = lazy(() => import('../pages/new entries forms/NewWork.jsx'))
    const NewExpo = lazy(() => import('../pages/new entries forms/NewExpo.jsx'))
    const AdminDashboard = lazy(() => import('../pages/AdminDashboard.jsx'))
    const SignIn = lazy(() => import('../pages/SignIn.jsx'))
    const ProtectedRoute = lazy(() => import('./ProtectedRoute.jsx'))
    const Trabajos = lazy(() => import('../pages/Trabajos.jsx'))
    const Contacto = lazy(() => import('../pages/Contacto.jsx'))
    const SobreMi = lazy(() => import('../pages/SobreMi.jsx'))
    const Expos = lazy(() => import('../pages/Expos.jsx'))

    const { setUserData } = useContext(UserContext)
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        async function loadaxios() {
            try {
                const { data } = await axios.post(urlToken, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const verObj = { ...data.user, 'online': true }
                setUserData(verObj)
            } catch (error) {
                console.log(error)
                sessionStorage.removeItem('token')
                setUserData(null)
            }
        }
        token
            ? loadaxios()
            : setUserData(null)

    }, [])

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
                        <Route path='expo/:id' element={<ExpoDetails />} />
                        <Route path='/admin' element={<ProtectedRoute component={AdminDashboard} />} />
                    </Route>
                    <Route path='/signin' element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </Suspense >
    )
}


