import axios from "axios"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextB";
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";
import { deleteFile, getStorageRefFromUrl, uploadFile } from "../components/firebase/config";
import { urlUser } from "../utils/urlStore";

export function useUserHandler() {
    const navigate = useNavigate()
    const { token, getToken, userData } = useContext(UserContext)

    useEffect(() => {
        getToken()
    }, [])

    const updateUser = async (newUser, _id, imageToDelete, imageToSend) => {
        if (!token) return navigate('/', { replace: true })

        if (imageToSend) {
            //elimina imagen existente en firebase
            try {
                deleteImgFirebase(imageToDelete)
            } catch (error) {
                console.log(error);
            }
            //sube a firebase nueva imagen, genera y devuelve se url
            try {
                const result = await uploadFile(imageToSend, 'perfil')
                newUser.profileImage = result
            } catch (error) {
                console.log(error);
            }
        } else {
            newUser.profileImage = imageToDelete
        }
        if (!newUser.password) { newUser.password = '123qwe' }
        if (!newUser.email) { newUser.email = 'melanivera.artista@gmail.com' }
        //prosigue a actualizar el usuario
        try {
            const updatedUser = await axios.put(`${urlUser}/${_id}`, newUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            Toastify({
                text: `Perfil actualizado correctamente`,
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


    return { updateUser, getUserInfo }
}