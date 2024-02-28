import axios from "axios"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextB";
import { urlWorks } from "../utils/urlStore";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";
import { deleteFile, getStorageRefFromUrl } from "../components/firebase/config";

export function useWorkHandler() {
    const navigate = useNavigate()
    const { token, getToken } = useContext(UserContext)

    useEffect(() => {
        getToken()
    }, [])


    const postNewWork = async (newWork) => {
        console.log(newWork, token);
        if (!token) return navigate('/', { replace: true })

        try {
            const createWork = await axios.post(urlWorks, newWork, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(createWork);
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
                navigate('/')
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
            console.log(imageRefToDelete);
            try {
                const imagedeletionResult = await deleteFile(imageRefToDelete)
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteWork = async (imgUrl, workId) => {
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
            const deletedwork = await axios.delete(`${urlWorks}/${workId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(deletedwork);
            return "deleted"
        } catch (error) {
            console.log(error);
        }

    }
    return { postNewWork, token, deleteWork }
}