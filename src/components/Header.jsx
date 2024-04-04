import { NavLink } from "react-router-dom";
import icon from '../assets/sessionIcon.png'
import { useScroll } from "../hooks/useScroll";

import { useContext } from "react";
import { UserContext } from "../context/UserContextB";


export function Header() {
    const { isScrolled } = useScroll()
    const { userData, setUserData, token, setToken } = useContext(UserContext)

    const handleSignout = () => {
        setUserData(null)
        setToken(null)
        sessionStorage.removeItem('token')
        location.reload()
        // Acá falta agregar lógica de logout
    }
    const handleNavClick = () => {
        location.reload()
    }

    return (
        <>
            <header
                className={`navbar w-screen flex justify-end items-center m-0 pr-[6vw] caveat text-[1.8em] fixed 
                rounded-[20px] ${isScrolled ? 'md:glass' : ''} z-50`}>
                <details className={`md:hidden collapse  text-center ${isScrolled ? 'glass top-0' : 'top-10'}`} >
                    <summary className="collapse-title text-xl font-medium w-full z-50 ">Click to open/close</summary>
                    <div className="collapse-content bg-[#CAEBDA] bg-opacity-90 rounded-lg">
                        <ul
                            className="flex flex-wrap p-[.3rem]  gap-[6vw] justify-between items-center [&_li]:w-72 [&_li]:z-[100] [&_li_div_div_a]:z-[100] ">
                            <li key='trabajos' onClick={handleNavClick}>
                                <NavLink to="/trabajos">
                                    Trabajos
                                </NavLink>
                            </li>
                            <li key='exposiciones' onClick={handleNavClick} >
                                <NavLink to="/exposiciones">
                                    Exposiciones
                                </NavLink>
                            </li>
                            <li key='sobre-mi' onClick={handleNavClick} >
                                <NavLink to="/sobre-mi">
                                    Sobre mí
                                </NavLink>
                            </li>
                            <li key='contacto' onClick={handleNavClick} >
                                <NavLink to="/contacto">
                                    Contacto
                                </NavLink>
                            </li>
                            <li>
                                <div className="caveat">
                                    {
                                        userData?.online ? (
                                            <div className="flex flex-col justify-center items-center">
                                                <NavLink to="/admin" onClick={handleNavClick} >Editar 🖌️</NavLink>
                                                <div onClick={handleSignout} className="text-black border-t-2 hover:cursor-pointer z-50" >Cerrar sesión 🔐 </div>
                                                <NavLink to={'/admin'} className="avatar" onClick={handleNavClick}>
                                                    <div className="w-24 rounded-full">
                                                        {
                                                            userData?.online
                                                                ? <img src={userData.profileImage} alt="Foto de Mélani Vera" className="w-full h-full object-cover" />
                                                                : 'no hay foto'
                                                        }
                                                    </div>
                                                </NavLink>
                                            </div>
                                        )
                                            : <div className="flex">
                                                <NavLink to="/signin" className='btn btn-outline hover:btn hover:text-slate-300 text-zinc-950' >🔑 Iniciar sesión </NavLink>
                                            </div>
                                    }
                                </div>
                            </li>
                        </ul>
                    </div>
                </details>

                {/* nav desktop */}
                <nav className="hidden md:flex text-2xl md:text-3xl items-center sm:gap-8 sm:w-3/4  p-[.5rem]" >
                    <ul
                        className="flex flex-wrap p-[.3rem] gap-[6vw] justify-between items-center ps-16">
                        <li key='trabajos'>
                            <NavLink to="/trabajos">
                                Trabajos
                            </NavLink>
                        </li>
                        <li key='exposiciones'>
                            <NavLink to="/exposiciones">
                                Exposiciones
                            </NavLink>
                        </li>
                        <li key='sobre-mi'>
                            <NavLink to="/sobre-mi">
                                Sobre mí
                            </NavLink>
                        </li>
                        <li key='contacto'>
                            <NavLink to="/contacto">
                                Contacto
                            </NavLink>
                        </li>
                        <li key='modal'>
                            <button className="" onMouseOver={() => document.getElementById('my_modal_1').showModal()}>
                                <NavLink to="/signin" className='hover:scale-[.8] hover:rotate-[360deg] hover:[transition:.5s]'  >
                                    <img src={icon} alt="" className="w-12 [transition:.5s]" />
                                </NavLink>
                            </button>
                            <dialog id="my_modal_1" className="modal text-black">
                                <div className="modal-box bg-[#FFFAF6] flex flex-wrap gap-6 items-center justify-center">
                                    <div className="caveat">
                                        {
                                            userData?.online ? (
                                                <div className="flex flex-col justify-center items-center">
                                                    <NavLink to="/admin" className={`cursor-pointer z-0`}>Editar 🖌️</NavLink>
                                                    <div onClick={handleSignout} className="border-t-2 cursor-pointer z-0" >Cerrar sesión 🔐 </div>
                                                    <div className="avatar">
                                                        <div className="w-24 rounded-full">
                                                            {
                                                                userData?.online
                                                                    ? <img src={userData.profileImage} alt="Foto de Mélani Vera" className="w-full h-full object-cover" />
                                                                    : 'no hay foto'
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                                : <div className="flex">
                                                    <NavLink to="/signin" className='btn btn-outline hover:btn hover:text-slate-300 text-zinc-950 z-50' >🔑 Iniciar sesión </NavLink>
                                                </div>
                                        }
                                    </div>
                                    <div className="modal-action ">
                                        <form method="dialog" className="flex flex-col">
                                            <button className="btn btn-accent">Cerrar</button>
                                            <div>
                                                <p className="py-4 text-base opacity-60 font-sans">Presionar la tecla ESC o el botón "cerrar" para cerrar </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </li>
                    </ul>


                    {/*   <div className=" min-h-[5rem] h-[8vh] md:flex items-center justify-center rounded-[50px] overflow-hidden sm:m-[.3rem] ">
                        {
                           
                                : 

                        }
                    </div> */}

                </nav>
            </header>
            {/* 
            <div className="[&_div]:absolute [&_div]:[transition:all_1s] [&_div]:right-[12vw] [&_div]:top-[8vw] [&_div]:w-32 [&_div]:h-20 [&_div]:p-4 [&_div]:bg-[rgba(255,_255,_255,_0.25)] [&_div]:[box-shadow:0_8px_32px_0_rgba(31,_38,_135,_0.37)] [&_div]:backdrop-filter [&_div]:backdrop-blur-sm [&_div]:rounded-[10px] [&_div]:border-[1px]  [&_div]:border-[solid rgba(255,255,255,0.18)] [&_div]:flex [&_div]:justify-center [&_div]:items-center caveat [&_div_a]:bg-transparent [&_div_a]:border-[none] [&_div_a]:text-[1.3rem] [&_div_a]:font-semibold">

             [&_div]:bg-[rgba(255,_255,_255,_0.25)] caveat [&_div_a]:bg-transparent [&_div_a]:border-[none] [&_div_a]:text-[1.3rem] [&_div_a]:font-semibold">

                {
                    popup && userData?.online ? (
                        <div className="flex-col" onMouseLeave={() 
                            <NavLink to="/admin">Editar 🖌️</NavLink>
                            <button onClick={handleSignout}>Cerrar sesión</button>
                        </div>
                    )
                        : popup && <div className="top-24" onMouseLeave={() 
                            <NavLink to="/signin" >Iniciar sesión</NavLink>
                        </div>
                }
            </div> */}

        </>
    )
}



