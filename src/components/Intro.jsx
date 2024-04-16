import '../style/Intro.css'
import deco2 from '../assets/deco2.png'
import deco3 from '../assets/deco3.png'

export function Intro() {
    // const [landingSt, setLanding] = useState(landing.current)

    // const handleClick = () => {
    //     landing.current = !landing.current
    //     setLanding(landing.current)
    // }

    return (
        <>
            <section className="introContainer z-50 text-slate-800">
                <img src={deco2} alt="decorador de página" className='deco2' loading="lazy" />
                <h1>Mélani Vera</h1>
                <h4>Artista Plástica</h4>
                <p></p>
                {/* <button onClick={handleClick}>
                    ingresar
                </button> */}
                <img src={deco3} alt="decorador de página" className='deco3' loading="lazy" />
            </section>
        </>
    )
}