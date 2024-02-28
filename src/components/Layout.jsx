import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import deco1 from '../assets/decorator1.png'
import deco4 from '../assets/deco4.png'
import { usePath } from "../hooks/usePath";


export function Layout() {
    const { title } = usePath()

    return (
        <>
            <Header />
            <main className="w-full min-h-screen pt-64 flex flex-col items-center justify-center">
                <h2
                    className="caveat absolute z-20 text-2xl text-black top-0 bg-[#CAEBDA] w-full md:w-36 flex justify-center py-3
                                md:left-14 md:top-[8vh] md:text-6xl md:bg-none md:bg-transparent">
                    {title}
                </h2>
                <img src={deco1} alt="Decorador de layout" className="fixed z-10 top-0 hidden
                md:grid md:w-[28rem] md:h-[22rem]  md:-top-[3rem] md:-left-[5rem]" />
                <div className="z-20">
                    <Outlet />
                </div>
                <img src={deco4} alt="Decorador de layout" className="fixed bottom-0 right-0 z-10" />
            </main>
        </>
    )
}