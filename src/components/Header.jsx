import { Link, NavLink } from "react-router-dom";
import '../style/Header.css'
import icon from '../assets/sessionIcon.png'
import { useScroll } from "../hooks/useScroll";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextB";



export function Header() {
    const { isScrolled } = useScroll()
    const { userData, setUserData } = useContext(UserContext)
    const [popup, setPopup] = useState(false)
    const handleSignout = () => {
        setUserData(null)
        sessionStorage.removeItem('token')
        setPopup(false)
    }

    return (
        <>
            <header className={`navBar ${isScrolled ? 'glass' : ''}`}>
                <nav >
                    <ul className="nav-xl">
                        <li key='trabajos'>
                            <Link to="/trabajos">
                                Trabajos
                            </Link>
                        </li>
                        <li key='exposiciones'>
                            <Link to="/exposiciones">
                                Exposiciones
                            </Link>
                        </li>
                        <li key='sobre-mi'>
                            <Link to="/sobre-mi">
                                Sobre mí
                            </Link>
                        </li>
                        <li key='contacto'>
                            <Link to="/contacto">
                                Contacto
                            </Link>
                        </li>
                    </ul>

                    <div>
                        {
                            userData?.online
                                ? <img src={userData.profileImage} alt="Foto de Mélani Vera" onMouseEnter={() => setPopup(true)} />
                                : <NavLink href="/signin"  ><img src={icon} alt="" onMouseEnter={() => setPopup(true)} />  </NavLink>

                        }
                    </div>

                </nav>
            </header>
            {
                popup && userData?.online ? (
                    <div className="signin-modal-cerrar" onMouseLeave={() => setPopup(false)}>
                        <NavLink href="/admin">Editar 🖌️</NavLink>
                        <button onClick={handleSignout}>Cerrar sesión</button>
                    </div>
                )
                    : popup && <div className="signin-modal-iniciar" onMouseLeave={() => setPopup(false)}>
                        <NavLink href="/signin" >Iniciar sesión</NavLink>
                    </div>
            }
        </>
    )
}



