import '../style/Expos.css'
import imgDefault from '../assets/imgDefault.avif'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContextB'
import { NavLink } from 'react-router-dom'
import Loader from '../components/microcomponents/Loader'
import DeleteModal from '../components/microcomponents/DeletModal'
import smile from '../assets/smile.avif'
import { useExpoHandler } from '../hooks/useExpoHandler'
import Toastify from 'toastify-js'

export default function Expos() {
    const [expoFetch, setExpoFetch] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { userData, setUserData } = useContext(UserContext)
    const [showModal, setShowModal] = useState(false)
    const [expoToDelete, setExpoToDelete] = useState(null)
    const { deleteExpo } = useExpoHandler()

    useEffect(() => {
        setIsLoading(true)
        try {
            fetch('https://melvera-api-c6l8.onrender.com/api/expos')
                .then(res => res.json())
                /* Cuando se empiece a manejar data real, hay que quitar la concatenacion de "expos" */
                .then(data => {
                    const sortedExpos = data.getExpos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setExpoFetch(sortedExpos)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }, [])

    const sendName = (expo) => {
        const sendNameTemp = expo.name?.split(' ').join('-') || expo.nombre.split(' ').join('-')
        return sendNameTemp
    }

    const handleDeleteExpo = async () => {
        const imgUrlToDelete = expoFetch.find(el => el._id === expoToDelete).image
        try {
            const ExpoFound = await deleteExpo(imgUrlToDelete, expoToDelete)
            if (ExpoFound) {
                setShowModal(false)
                Toastify({
                    text: "Exposición eliminada de forma exitosa",
                    duration: 2000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, red, orange)",
                    },
                    onClick: function () {
                    } // Callback after click
                }).showToast();
                const timeOut = setTimeout(() => {
                    clearTimeout(timeOut)
                    location.reload()
                }, 2000)
            }
        } catch (error) {
            console.log(error);
            setShowModal(false)
            Toastify({
                text: error,
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, red, orange)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        }
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
                            !expoFetch ? <h3 className='min-h-96 w-full text-center caveat text-4xl font-extrabold'>No hay exposiciones aún</h3> :
                                expoFetch?.map(expo => (
                                    <div className='relative w-full bg-[#caebda] rounded-tl-[15%] rounded-br-[15%] rounded-tr-[10%] rounded-bl-[10%] p-4 bg-opacity-60 cursor-pointer' key={expo._id || expo.nombre}>
                                        <NavLink
                                            to={{
                                                pathname: `../expo/${sendName(expo)}`,
                                                search: `?id=${expo._id}`
                                            }}
                                            className={'z-10'}

                                        >
                                            <article className='flex flex-col md:flex-row gap-1'>
                                                <header className="expoCardHeader">
                                                    <div className='border-b-2  text-end pe-5'>
                                                        <h5>{expo.date}</h5>
                                                        <h5>{expo.address && expo.address}</h5>
                                                    </div>
                                                    <h3 className='font-bold caveat text-2xl'>{expo.name || expo.nombre}</h3>
                                                    <p>{expo.info?.slice(0, 50)}...  </p>
                                                    <sub className='absolute bottom-5 right-1/2'>Click para leer más</sub>
                                                </header>
                                                <div className="expoCardBody">
                                                    <img src={expo.image || "www.foto.com/expo1"} alt="miniatura de exposicion" onError={event => event.target.src = imgDefault} loading="lazy" />
                                                </div>
                                            </article>
                                        </NavLink>
                                        {
                                            userData &&
                                            <div className='tooltip absolute bottom-2 md:top-0 right-2 drop-shadow-lg z-20  ' data-tip="Eliminar">

                                                <button className='w-10 md:w-12 hover:rotate-180 hover:transition transition' onClick={() => {
                                                    setShowModal(true)
                                                    setExpoToDelete(expo._id || expo.id)
                                                }}>
                                                    <img src={smile} alt="botón bote de basura para eliminar el item" loading="lazy" />
                                                </button>
                                            </div>

                                        }
                                    </div>
                                ))

                        }
                        {showModal && (
                            <DeleteModal
                                isOpen={showModal}
                                onClose={() => setShowModal(false)}
                                onDelete={handleDeleteExpo}
                            >
                                <p>¿Estás seguro/a de que deseas eliminar esta exposición/presentación/muestra?</p>
                            </DeleteModal>
                        )}
                    </section >
            }
        </>
    )
}