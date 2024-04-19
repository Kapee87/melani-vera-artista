import { Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { usePath } from "../hooks/usePath.js";
import deco1 from "../assets/decorator1.avif";
import deco4 from "../assets/deco4.avif";
import WapBtn from "./microcomponents/WapBtn.jsx";

export function Layout() {
    const { title } = usePath();

    return (
        <>
            <Header />
            <main className="w-full min-h-screen pt-32 md:pt-64 flex flex-col items-center justify-center">
                {title && (
                    <h2
                        className="caveat absolute z-20 text-2xl text-black top-0 bg-[#CAEBDA] w-full md:w-36 flex justify-center py-3 md:left-14 md:top-[8vh] md:text-6xl md:bg-none md:bg-transparent"
                    >
                        {title.split("/")[0] === "Expo" || title.split("/")[0] === "Trabajo"
                            ? title.split("/")[1]
                            : title}
                    </h2>
                )}
                <img
                    src={deco1}
                    alt="Decorador de layout"
                    className="absolute z-10 top-0 hidden md:block md:w-[28rem] md:h-[22rem] md:-top-[3rem] md:-left-[5rem]"
                    loading="lazy"
                />
                <div className="z-20 max-w-full">
                    <Outlet />
                </div>
                <img
                    src={deco4}
                    alt="Decorador de layout"
                    className="absolute bottom-0 right-0 z-10"
                    loading="lazy"
                />
            </main>
            <WapBtn />
        </>
    );
}