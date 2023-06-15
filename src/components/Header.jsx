import { Link } from "react-router-dom";
import '../style/Header.css'
import { useScroll } from "../hooks/useScroll";
import { urlPerfil } from '../mocks/sobreMi.json'

export function Header() {
    const { isScrolled } = useScroll()

    return (
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
                    <img src={urlPerfil} alt="Foto de Mélani Vera" />
                </div>
            </nav>
        </header>
    )
}       