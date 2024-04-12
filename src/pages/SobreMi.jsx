import { useEffect, useState } from "react"
import Loader from "../components/microcomponents/Loader"


export function SobreMi() {
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
                    <section className="flex flex-col w-4/5 md:w-2/3 mx-auto md:gap-10 backdrop-blur-sm text-primary-content min-h-screen">
                        <div className="avatar flex flex-col md:flex-row items-center gap-4 caveat md:self-end">
                            <h2 className="text-4xl drop-shadow-lg "> {profileInfo.name} </h2>
                            <div className="w-32 md:w-40 mask mask-circle">
                                <img src={profileInfo.profileImage || "www.foto.com/expo1"} alt="" />
                            </div>
                        </div>
                        <div className="caveat text-2xl flex flex-col gap-2">
                            {/* <h4 className=" font-bold">Sobre mí</h4> */}

                            {
                                /* analizar si al trabajar con data real hace falta hacer split para armar los párrafos. */
                                profileInfo && profileInfo?.info?.split('.').map((paragraph, index) => (
                                    paragraph !== '' && <p key={index}>{paragraph}.</p>
                                ))
                            }
                        </div>
                    </section>
            }
        </>
    )
}