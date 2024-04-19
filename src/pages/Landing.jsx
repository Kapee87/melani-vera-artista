/**
 * Landing page component that displays the Intro component if the landing state is true,
 * and the Router component if the landing state is false.
 */

import { Intro } from "../components/Intro.jsx";
import Router from "../router/Router.jsx";
import { UserContextProvider } from "../context/UserContextB.jsx";

import { useLanding } from "../hooks/useLanding.js";

export function Landing() {
    const { landingSt } = useLanding();

    return (
        <UserContextProvider>
            {landingSt ? (
                <Intro key="intro" />
            ) : (
                <Router key="router" to="/" />
            )}
        </UserContextProvider>
    );
}