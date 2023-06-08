import { Link } from "react-router-dom";
import '../style/Header.css'
import { useScroll } from "../hooks/useScroll";
const urlAvatar = 'https://scontent.faep14-2.fna.fbcdn.net/v/t39.30808-6/345865600_1270293186902897_198788907389616327_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEorbtZC6dkzCIPCC0zRcG0bS1PAkPTeqptLU8CQ9N6qr4sq2eDVn_afXDk3d8GO5k&_nc_ohc=DINCSvP0AP0AX8RPOy0&_nc_ht=scontent.faep14-2.fna&oh=00_AfAHUKyLDBHDJ628xQNdjbyg_ePkFGN9aw7XBjDPTmU0iA&oe=6486DE23'
export function Header() {
    const { isScrolled } = useScroll()
    
    return (
        <header className={`navBar ${isScrolled ? 'glass' : ''}`}>
            <nav >
                <ul>
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
                <img src={urlAvatar} alt="avatar" />
            </nav>
        </header>
    )
}