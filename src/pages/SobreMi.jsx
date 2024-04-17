import { useEffect, useState } from "react"
import Loader from "../components/microcomponents/Loader"
import MediaBtn from "../components/microcomponents/MediaBtn"
import facebookSvg from '../assets/facebookIcon.svg'
import instaSvg from '../assets/instagramIcon.svg'
import mailSvg from '../assets/mail.svg'


export default function SobreMi() {
    const [profileInfo, setProfileInfo] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        try {
            fetch('https://melvera-api-c6l8.onrender.com/api/user')
                .then(res => res.json())
                .then(data => {
                    setProfileInfo(data.Users[0])
                    setIsLoading(false)
                })

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }, [])
    return (
        <>
            {
                isLoading ? <Loader /> :
                    <section className="flex flex-col w-4/5 md:w-2/3 mx-auto md:gap-10 backdrop-blur-sm text-black min-h-screen mb-20 lg:mb-0">
                        <div className="avatar flex flex-col md:flex-row items-center gap-4 caveat md:self-end">
                            <h2 className="text-4xl drop-shadow-lg "> {profileInfo.name} </h2>
                            <div className="w-32 md:w-40 mask mask-circle">
                                <img src={profileInfo.profileImage || "www.foto.com/expo1"} alt="" loading="lazy" />
                            </div>
                        </div>
                        <div className="caveat text-2xl flex flex-col gap-2">

                            {
                                /* analizar si al trabajar con data real hace falta hacer split para armar los párrafos. */
                                profileInfo && profileInfo?.info?.split('.').map((paragraph, index) => (
                                    paragraph !== '' && <p key={index}>{paragraph}.</p>
                                ))
                            }
                        </div>
                        <aside className="flex justify-around rounded-2xl bg-[#caebda] bg-opacity-65 p-3">

                            <MediaBtn urlMedia={'https://www.facebook.com/profile.php?id=100063608466601'} svgIcon={facebookSvg} altText={'Botón para visitar el perfil de Facebook'} />
                            <MediaBtn urlMedia={'https://www.instagram.com/melani.vera_artista?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='} svgIcon={instaSvg} altText={'Botón para visitar el perfil de Instagram'} />
                            <MediaBtn urlMedia={'mailto:melanivera.artista@gmail.com'} svgIcon={mailSvg} altText={'Botón para enviar correo electrónico'} />
                        </aside>
                    </section>
            }
        </>
    )
}