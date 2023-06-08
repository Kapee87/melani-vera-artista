import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { Trabajos } from '../pages/Trabajos.jsx'
import { Expos } from '../pages/Expos.jsx'
import { Contacto } from '../pages/Contacto.jsx'
import { SobreMi } from '../pages/SobreMi.jsx'
import Layout from './Layout.jsx'

export default function Router() {

    return (
        <Suspense fallback={<h3>Cargando...</h3>}>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Layout />}>
                        <Route path='/trabajos' element={<Trabajos />} />
                        <Route path='/exposiciones' element={<Expos />} />
                        <Route path='/contacto' element={<Contacto />} />
                        <Route path='/sobre-mi' element={<SobreMi />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}


