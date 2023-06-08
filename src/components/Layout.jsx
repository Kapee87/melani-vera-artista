import { Outlet, useLocation, useSearchParams } from "react-router-dom"
import { Header } from "./Header"
import deco1 from '../assets/decorator1.png'
import '../style/Layout.css'
import { useEffect, useState } from "react";
// import Footer from "./Footer"

//falta estilizar y armar el header y el decorator

export default function Layout() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [title, setTitle] = useState()
    useEffect(() => {
        setTitle(currentPath.substring(1).charAt(0).toUpperCase() + currentPath.substring(1).slice(1))
    }, [currentPath])


    return (
        <>
            <Header />
            <main>
                <h2 className="sectionName">{title}</h2>
                <img src={deco1} alt="Decorador de layout" className="deco1" />
                <Outlet />
            </main>
        </>
    )
}