import '../style/Expos.css'
import expos from '../mocks/expos.json'
import imgDefault from '../assets/imgDefault.jpg'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContextB'
import { NavLink } from 'react-router-dom'
import Loader from '../components/microcomponents/Loader'
import DeleteModal from '../components/microcomponents/DeletModal'
import smile from '../assets/smile.png'

export function Expos() {
    const [expoFetch, setExpoFetch] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { userData, setUserData } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        try {
            fetch('https://melvera-api-c6l8.onrender.com/api/expos')
                .then(res => res.json())
                /* Cuando se empiece a manejar data real, hay que quitar la concatenacion de "expos" */
                .then(data => {
                    setExpoFetch(data.getExpos.concat(expos))
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }, [])
    useEffect(() => {
        // console.log(expoFetch);
    }, [expoFetch])
    const sendName = (expo) => {
        const sendNameTemp = expo.name?.split(' ').join('-') || expo.nombre.split(' ').join('-')
        return sendNameTemp
    }

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <section className='w-[80vw] flex flex-col items-center justify-center gap-2 font-thin relative'>
                        <div className='flex flex-wrap items-center justify-between w-full '>
                            <h2 className='expoTitle text-center grow '>Exposiciones - Presentaciones - Puestos</h2>
                            {
                                userData && <div className='flex justify-end userControls grow md:grow-0'>
                                    <NavLink to={'/nueva-exposicion'} className={'flex justify-end'} >
                                        <span>Nueva expo</span> ➕
                                    </NavLink>
                                </div>

                            }
                        </div>
                        {
                            /* Hay que cambiar algunos fallbacks cuando se empiecen a cargar datos reales. */
                            expoFetch?.map(expo => (
                                <div className='relative w-full bg-[#caebda] rounded-tl-[15%] rounded-br-[15%] rounded-tr-[10%] rounded-bl-[10%] p-4 bg-opacity-60 cursor-pointer' key={expo._id || expo.nombre}>
                                    <NavLink
                                        to={{
                                            pathname: `../expo/${sendName(expo)}`,
                                            search: `?id=${expo._id}`
                                        }}
                                        className={'z-10'}

                                    >
                                        <article className='flex gap-1'>
                                            <header className="expoCardHeader">
                                                <h5>{expo.date || expo.fecha}</h5>
                                                <h3>{expo.name || expo.nombre}</h3>
                                                <p>{expo.info || expo.descripcion} </p>
                                            </header>
                                            <div className="expoCardBody">
                                                <img src={expo.urlImagen || "www.foto.com/expo1"} alt="miniatura de exposicion" onError={event => event.target.src = imgDefault} />
                                            </div>

                                        </article>
                                    </NavLink>
                                    {
                                        userData &&
                                        <button className='w-16 absolute top-0 right-0 drop-shadow-lg z-20 hover:rotate-180 hover:transition transition' onClick={() => {
                                            setShowModal(true)
                                        }}>
                                            <img src={smile} alt="botón bote de basura para eliminar el item" />
                                        </button>

                                    }
                                </div>
                            ))
                        }
                        {showModal && (
                            <DeleteModal
                                isOpen={showModal}
                                onClose={() => setShowModal(false)}
                                onDelete={() => console.log('delete expo')}
                            >
                                <p>¿Estás seguro/a de que deseas eliminar esta exposición/presentación/muestra?</p>
                            </DeleteModal>
                        )}
                    </section >
            }
        </>
    )
}