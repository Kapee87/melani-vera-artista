import { Intro } from "../components/Intro"
import Router from "../components/Router";
import { UserContextProvider } from "../context/userContext";
import { useLanding } from "../hooks/useLanding"


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