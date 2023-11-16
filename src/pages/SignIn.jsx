import React, { useContext, useEffect, useRef, useState } from "react"
import '../style/signin.css'
import { UserContext } from "../context/userContext"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Toastify from 'toastify-js'

import { useIsLogged } from "../hooks/useIslogged"


function SignIn() {
    const { userData, setUserData } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [errorSignIn, setErrorSignIn] = useState([])
    const isLogged = useIsLogged()
    const navigate = useNavigate()
    const formFields = {
        email: useRef(null),
        password: useRef(null),
    };
    useEffect(() => {
        isLogged ? navigate('/') : setUserData(null)
    }, [])


    const handleSubmit = async (e) => {
        let timeOut;
        //
        e.preventDefault()
        setIsLoading(true)
        const formData = {
            email: formFields.email.current.value,
            password: formFields.password.current.value
        }

        if (isFormValid() == 0) {
            try {
                const tempUserData = await axios.post('https://melvera-api.onrender.com/api/auth/signin', formData)

                setUserData({ ...tempUserData.data.response.user, 'online': true })

                Toastify({
                    text: `Bienvenid@, ${tempUserData.data.response.user.name || 'user'}, en instantes serás redireccionad@`,
                    duration: 2000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { }, // Callback after click
                }).showToast();

                timeOut = setTimeout(() => {
                    sessionStorage.setItem('token', tempUserData.data.response.token)
                    clearTimeout(timeOut)
                    navigate('/')
                }, 2000)

            } catch (error) {
                console.log(error)
                Toastify({
                    text: error.response?.data?.message || error,
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #fc0202, #ffa303)"
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
                return setUserData(null)
            } finally {
                setIsLoading(false)
            }
        } else {
            console.log(errorSignIn);
            setIsLoading(false)
        }

    }

    const isFormValid = () => {
        setErrorSignIn([])
        // Objeto para almacenar errores
        const validationErrors = [];

        // Validación del campo email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(formFields.email.current.value)) {
            validationErrors.push('Email no válido');
        }

        // Validación del campo contraseña
        if (formFields.password.current.value.length < 6) {
            validationErrors.push('La contraseña debe tener al menos 6 caracteres');
        }
        console.log(validationErrors)
        validationErrors.map(e => {
            setErrorSignIn(prev => [...prev, e]);
        })
        resetErrors()
        return validationErrors.length
    }

    const resetErrors = () => {
        const timeOut = setTimeout(() => {
            setErrorSignIn([])
            clearTimeout(timeOut)
        }, 5000)
    }

    return (
        <section className="singin">
            {
                !isLoading & !userData ?
                    <form action="" className="signin-form" onSubmit={handleSubmit}>
                        <h2>Iniciar sesión</h2>

                        <input type="text" placeholder="usuario@unmail.com" ref={formFields.email} />

                        <input type="text" placeholder="contraseña" ref={formFields.password} />

                        <button type="submit" >Iniciar sesión</button>

                        <Link to="/">Volver a inicio </Link>

                        <ul className="errorBox">
                            {errorSignIn?.length > 0 && errorSignIn?.map(error => (
                                <li key={error}>{error} </li>
                            ))}

                        </ul>

                    </form>
                    : <p className="loading">Cargando..</p>
            }
        </section>
    )
}

export default SignIn