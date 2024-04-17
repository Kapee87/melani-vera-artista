import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import imgDefault from '../assets/imgDefault.avif'
import Loader from '../components/microcomponents/Loader';

function ExpoDetails() {
    const { search } = useLocation()
    const params = new URLSearchParams(search);
    const id = params.get('id');
    const [expoDetail, setExpoDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        try {
            fetch(`https://melvera-api-c6l8.onrender.com/api/expos/${id}`)
                .then(res => res.json())
                .then(data => {
                    setExpoDetail(data.Expo)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log(error)
            setExpoDetail({
                name: "no hay datos",
                date: "no hay datos",
                info: "no hay datos"
            })
            setIsLoading(false)
        }
    }, [])

    return (
        <section className='w-[60vw] min-h-screen flex flex-col items-center gap-5 caveat text-primary-content relative'>
            {
                isLoading
                    ? <Loader />
                    : <>
                        <div className='self-end flex flex-col'>
                            <h3 className='text-4xl md:text-6xl'>
                                {expoDetail?.name}
                            </h3>
                            <h5 className='self-end md:text-2xl text-slate-400'>
                                {expoDetail?.date}
                            </h5>
                            <h4 className='self-end'>
                                {expoDetail.address && expoDetail.address}
                            </h4>
                            {expoDetail.website && (
                                <a href={expoDetail.website} target='_blank' className='self-end text-info text-2xl md:tooltip md:tooltip-right' data-tip='Hacé click acá'>
                                    Visitar el sitio web
                                </a>
                            )}

                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <img src={expoDetail.image} alt={expoDetail.name} onError={event => event.target.src = imgDefault} className='rounded-md' loading="lazy" />
                            <p className='md:w-4/5 text-xl md:text-3xl text-pretty'>
                                {expoDetail.info}
                            </p>
                        </div>
                    </>
            }

        </section >
    )
}

export default ExpoDetails