import { Link } from 'react-router-dom'
import imagesUrl from '../mocks/imagesUrl.json'
import imgDefault from '../assets/imgDefault.jpg'
import '../style/Trabajos.css'
import { useEffect } from 'react'

export function Trabajos() {
    useEffect(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        imgs.forEach(i => i.addEventListener('error', event => {
            
            i.src = imgDefault
        })
        )
    }, [])
    return (
        <>
            <section className="trabajos">
                <div className="gridContainer">
                    <ul>
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
                        }
                    </ul>

                </div>
            </section>
        </>
    )
}