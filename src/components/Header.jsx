import { Link } from "react-router-dom";
import '../style/header.css'
import icon from '../assets/sessionIcon.png'
import { useScroll } from "../hooks/useScroll";
import { UserContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";


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
                                : <a href="/signin"  ><img src={icon} alt="" onMouseEnter={() => setPopup(true)} />  </a>

                        }
                    </div>

                </nav>
            </header>
            {
                popup && userData?.online ? (
                    <div className="signin-modal-cerrar" onMouseLeave={() => setPopup(false)}>
                        <a href="/profileEdit">Editar 🖌️</a>
                        <button onClick={handleSignout}>Cerrar sesión</button>
                    </div>
                )
                    : popup && <div className="signin-modal-iniciar" onMouseLeave={() => setPopup(false)}>
                        <a href="/signin" >Iniciar sesión</a>
                    </div>
            }
        </>
    )
}



