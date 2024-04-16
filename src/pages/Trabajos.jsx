import { Link, NavLink } from 'react-router-dom'
import { useContext, useEffect, useState, } from 'react'
import DeleteModal from '../components/microcomponents/DeletModal'
import smile from '../assets/smile.png'
import imgDefault from '../assets/imgDefault.jpg'
import Toastify from 'toastify-js'
import '../style/Trabajos.css'
import { UserContext } from '../context/UserContextB'
import { useWorkHandler } from '../hooks/useWorkHandler'
import Loader from '../components/microcomponents/Loader'



export function Trabajos() {
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [imgs, setImgs] = useState([])
    const [imgUrlToDelete, setImgUrlToDelete] = useState(null)
    const { userData, setUserData } = useContext(UserContext)
    const { deleteWork, deleteImgFirebase } = useWorkHandler()

    useEffect(() => {
        setIsLoading(true)
        try {
            fetch('https://melvera-api-c6l8.onrender.com/api/works')
                .then(res => res.json())
                .then(data => {
                    const sortedImgs = data.getWorks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setImgs(sortedImgs);
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }, [])

    const handleDeleteWork = async () => {
        const workId = imgs.find(el => el.imageUrl == imgUrlToDelete)._id
        console.log(workId);
        try {
            const workFound = await deleteWork(imgUrlToDelete, workId)
            if (workFound) {
                setShowModal(false)
                Toastify({
                    text: "Trabajo eliminado de forma exitosa",
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
                    <section className="trabajos">
                        {
                            userData && <div className='flex justify-end userControls '>
                                <NavLink to={'/crear-trabajo'} className={'flex justify-end'} ><span>Nuevo trabajo</span> ➕</NavLink>
                            </div>
                        }
                        <div className="gridContainer">
                            <ul >
                                {
                                    !imgs
                                        ?
                                        <h3 className='min-h-96 w-full text-center caveat text-4xl font-extrabold'>No hay trabajos aún.</h3>
                                        :
                                        imgs?.map(image => {
                                            return (
                                                <li key={image._id} className='lg:[&_span]:hover:flex lg:[&_span]:hover:transition-all lg:max-w-64'>
                                                    <Link to={image.imageUrl} target='_blank' >
                                                        <img src={image.imageUrl.length > 0 ? image.imageUrl : imgDefault} alt="" id={`workImage${image._id}`} />
                                                    </Link>
                                                    {
                                                        userData &&
                                                        <button className='eraseBtn z-[100]' onClick={() => {
                                                            setShowModal(true)
                                                            setImgUrlToDelete(image.imageUrl)
                                                        }}>
                                                            <img src={smile} alt="botón bote de basura para eliminar el item" />
                                                        </button>

                                                    }
                                                    <span className='hidden lg:transition-all absolute bg-black
                                                 bg-opacity-40 w-full items-center justify-center text-white py-2 flex-col'>
                                                        {image.name}
                                                        <Link to={image.imageUrl} target='_blank'>
                                                            <p className='text-xs opacity-75 text-white'>Abrir imagen</p>
                                                        </Link>
                                                    </span>
                                                </li>
                                            )
                                        })
                                }
                                {showModal && (
                                    <DeleteModal
                                        isOpen={showModal}
                                        onClose={() => setShowModal(false)}
                                        onDelete={handleDeleteWork}
                                    >
                                        <p>¿Estás seguro/a de que deseas eliminar este trabajo?</p>
                                    </DeleteModal>
                                )}
                            </ul>
                        </div>
                    </section>
            }
        </>
    )
}