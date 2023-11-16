import { Intro } from "../components/Intro.jsx"
import Router from "../components/Router.jsx";
import { UserContextProvider } from "../context/UserContextB.jsx";



import { useLanding } from "../hooks/useLanding.js"

export function Landing() {
    const { landingSt } = useLanding()

    return (
        <>
            <UserContextProvider>
                {landingSt && <Intro />}
                {!landingSt && <Router to='/' />}
            </UserContextProvider>
        </>
    )
}