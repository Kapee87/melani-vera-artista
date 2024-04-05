import axios from "axios"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextB";
import { urlExpos } from "../utils/urlStore";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";
import { deleteFile, getStorageRefFromUrl } from "../components/firebase/config";

export function useExpoHandler() {
    const navigate = useNavigate()
    const { token, getToken } = useContext(UserContext)

    useEffect(() => {
        getToken()
    }, [])


    const postNewExpo = async (newExpo) => {
        console.log(newExpo, token);
        if (!token) return navigate('/', { replace: true })

        try {
            const createExpo = await axios.post(urlExpos, newExpo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(createExpo);
            Toastify({
                text: `Creado con éxito`,
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
            const timeOut = setTimeout(() => {
                clearTimeout(timeOut)
                navigate('/exposiciones')
            }, 2000)
        } catch (error) {
            Toastify({
                text: error,
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
        }
    }

    const deleteImgFirebase = async (imgUrl) => {
        try {
            //ref search for the img on firebase storage
            const imageRefToDelete = await getStorageRefFromUrl(imgUrl)
            try {
                const imagedeletionResult = await deleteFile(imageRefToDelete)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteExpo = async (imgUrl, ExpoId) => {
        if (!token) {
            console.log("no hay token");
            return navigate('/', { replace: true })
        }
        try {
            deleteImgFirebase(imgUrl)
        } catch (error) {
            console.log(error)
        }
        console.log(token);
        try {
            console.log(ExpoId);
            const deletedExpo = await axios.delete(`${urlExpos}/${ExpoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(deletedExpo);
            return "deleted"
        } catch (error) {
            console.log(error);
        }

    }
    return { postNewExpo, token, deleteExpo }
}