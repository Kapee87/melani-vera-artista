import React, { useRef, useState } from 'react'
import { useExpoHandler } from '../../hooks/useExpoHandler'
import Toastify from 'toastify-js'
import { uploadFile } from '../../components/firebase/config'

function NewExpo() {
    const { postNewExpo } = useExpoHandler()
    const [imageRender, setImageRender] = useState(null)
    const [imageToSend, setImageToSend] = useState(null)
    const inputRef = {
        name: useRef(),
        info: useRef(),
        date: useRef(),
        image: useRef(),
        address: useRef(),
        website: useRef()
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newExpo = {
            name: inputRef.name.current.value,
            info: inputRef.info.current.value,
            date: inputRef.date.current.value,
            address: inputRef.address.current.value,
            website: inputRef.website.current.value,
            image: ''
        }
        try {
            const result = await uploadFile(imageToSend, 'exposiciones')
            newExpo.image = result
        } catch (error) {
            console.log(error);
        }
        postNewExpo(newExpo)
    }

    const handleOnChange = (e) => {
        e.preventDefault()
        const file = e.target.files[0];
        console.log(file);
        setImageToSend(file)
        if (file) {
            // Verificar si el archivo es una imagen
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageRender(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                Toastify({
                    text: 'Por favor selecciona un archivo de imagen',
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
                e.target.value = null;
            }
        }
    }
    return (
        <div className=' min-h-screen flex flex-col'>
            <form className={`
                shadow-xl p-5 md:p-12 rounded-xl drop-shadow-lg bg-[#caebda] bg-opacity-65
                flex flex-col gap-4 items-end
                [&_label]:flex [&_label]:gap-2 [&_label]:items-baseline [&_label>input]:rounded-md [&_label>textarea]:rounded-md [&_label]:flex-col md:[&_label]:flex-row z-10 
            `}
                onSubmit={handleSubmit} >
                <label htmlFor="name">
                    Nombre:
                    <input name='name' ref={inputRef.name} type="text" minLength={6} />
                </label>
                <label htmlFor="date">
                    Fecha:
                    <input name='date' ref={inputRef.date} type="date" minLength={6} />
                </label>
                <label htmlFor="address">
                    Dirección(opcional):
                    <input name='address' ref={inputRef.address} type="text" minLength={6} />
                </label>
                <label htmlFor="website">
                    Enlace o vínculo a Url del evento(opcional):
                    <input name='website' ref={inputRef.website} type="url" minLength={6} />
                </label>
                <label htmlFor="info">
                    Detalles:
                    <textarea name="info" ref={inputRef.info} className='textarea-md' minLength={6} ></textarea>
                </label>
                <label htmlFor="image">
                    Imagen:
                    <input name='image' ref={inputRef.image} type="file" onChange={handleOnChange} />
                </label>
                {
                    imageRender && <img src={imageRender} alt="imagen seleccionada por el usuario para crear una nueva entrada" className='w-full max-w-72 self-center  object-cover object-center rounded-2xl' />
                }
                <input type="submit" value="Crear exposición" className='btn btn-outline ' />
            </form>
        </div>
    )
}

export default NewExpo;

