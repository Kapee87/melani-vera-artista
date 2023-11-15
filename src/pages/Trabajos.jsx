import { Link, NavLink } from 'react-router-dom'
import imgDefault from '../assets/imgDefault.jpg'
import '../style/trabajos.css'
import { useContext, useEffect, useState, } from 'react'
import { UserContext } from '../context/userContext'

export function Trabajos() {
    const [imgs, setImgs] = useState([])
    const { userData, setUserData } = useContext(UserContext)

    useEffect(() => {
        try {
            fetch('https://melvera-api.onrender.com/api/works')
                .then(res => res.json())
                .then(data => setImgs(data.getWorks))
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            <section className="trabajos">
                {
                    userData && <div className='userControls'>
                        <NavLink to={'/'}>➕</NavLink>
                    </div>
                }
                <div className="gridContainer">
                    <ul>
                        {
                            imgs?.map(image => {
                                return (
                                    <li key={image._id}>
                                        <Link>
                                            <img src={image.imageUrl || imgDefault} alt="" />
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        {/*  {
                            imagesUrl.map(image => {
                                return (
                                    <li key={image.id}>
                                        <Link>
                                            <img src={image.urlImage} alt="" />
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        {
                            imagesUrl.map(image => {
                                return (
                                    <li key={image.id}>
                                        <Link>
                                            <img src={image.urlImage} alt="" />
                                        </Link>
                                    </li>
                                )
                            })
                        } */}
                    </ul>

                </div>
            </section>
        </>
    )
}