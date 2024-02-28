import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContextB"
import toastify from "toastify-js"

export function useIsLogged() {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const isLogged = () => {
        // console.log(token, sessionStorage.getItem('token'));
        if (!token && !sessionStorage.getItem('token')) {
            toastify({
                text: `Por favor, iniciar sesión para ingresar a esta sección`,
                duration: 2000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #fc0202, #ffa303)"
                },
                onClick: function () { }, // Callback after click
            }).showToast();
            const timeOut = setTimeout(() => {
                clearTimeout(timeOut)
                navigate('/')
            }, 2000)
        } else {
            return true
        }
    }
    return { isLogged }

}