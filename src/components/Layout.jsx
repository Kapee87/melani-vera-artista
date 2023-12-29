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
            <main className="w-full min-h-screen pt-64 flex flex-col items-center justify-center -z-10">
                <h2 className="sectionName ">{title}</h2>
                <img src={deco1} alt="Decorador de layout" className=" w-[28rem] h-[22rem] fixed -top-[3rem] -left-[5rem] z-10  " />
                <Outlet />
                <img src={deco4} alt="Decorador de layout" className="fixed bottom-0 right-0 z-10" />
            </main>
        </>
    )
}