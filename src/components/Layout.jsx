import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import deco1 from '../assets/decorator1.png'
import deco4 from '../assets/deco4.png'
import '../style/Layout.css'
import { usePath } from "../hooks/usePath";


export function Layout() {
    const { title } = usePath()

    return (
        <>
            <Header />
            <main>
                <h2 className="sectionName">{title}</h2>
                <img src={deco1} alt="Decorador de layout" className="deco1" />
                <Outlet />
                <img src={deco4} alt="Decorador de layout" className="deco4" />
            </main>
        </>
    )
}