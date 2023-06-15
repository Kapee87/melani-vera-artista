import { Intro } from "../components/Intro"
import Router from "../components/Router";
import { useLanding } from "../hooks/useLanding"


export function Landing() {
    const { landingSt } = useLanding()

    return (
        <>
            {landingSt && <Intro />}
            {!landingSt && <Router to='/' />}
        </>
    )
}