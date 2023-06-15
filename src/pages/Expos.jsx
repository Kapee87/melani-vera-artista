import '../style/Expos.css'
import expos from '../mocks/expos.json'
import imgDefault from '../assets/imgDefault.jpg'

export function Expos() {

    return (
        <>
            <section className='expoContainer'>
                <h2 className='expoTitle'>Exposiciones - Presentaciones - Puestos</h2>
                {
                    expos.map(expo => (
                        <article className='expoCard' key={expo.nombre}>
                            <header className="expoCardHeader">
                                <h5>{expo.fecha}</h5>
                                <h3>{expo.nombre}</h3>
                                <p>{expo.descripcion} </p>
                            </header>
                            <section className="expoCardBody">
                                <img src={expo.urlImagen} alt="miniatura de exposicion" onError={event => event.target.src = imgDefault} />
                            </section>
                        </article>
                    ))
                }
            </section>
        </>
    )
}