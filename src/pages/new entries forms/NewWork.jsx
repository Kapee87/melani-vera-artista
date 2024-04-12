import React, { useRef, useState } from 'react'
import { useWorkHandler } from '../../hooks/useWorkHandler'
import Toastify from 'toastify-js'
import { uploadFile } from '../../components/firebase/config'

function NewWork() {
  const [imageRender, setImageRender] = useState(null)
  const [imageToSend, setImageToSend] = useState(null)
  const { postNewWork } = useWorkHandler()
  const inputRef = {
    name: useRef(),
    detail: useRef(),
    imageUrl: useRef()
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const newWork = {
      name: inputRef.name.current.value,
      detail: inputRef.detail.current.value,
      imageUrl: ''
    }
    if (!newWork.name || (!imageToSend || !imageRender)) {
      let message = '';
      if (!newWork.name) {
        message += 'Por favor ingresa el nombre del cuadro/obra.';
      }
      if (!imageToSend || !imageRender) {
        if (message) message += '\n';
        message += 'Por favor selecciona una imagen.';
      }

      Toastify({
        text: message,
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
      return;
    }
    try {
      const result = await uploadFile(imageToSend, 'trabajos')
      newWork.imageUrl = result
    } catch (error) {
      console.log(error);
    }
    postNewWork(newWork)

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
      <form className='shadow-xl p-5 md:p-12 rounded-xl drop-shadow-lg bg-[#caebda] bg-opacity-65
      flex flex-col gap-4 [&_label]:flex [&_label]:gap-2 [&_label]:items-baseline [&_label>input]:rounded-md [&_label>textarea]:rounded-md [&_label]:flex-col md:[&_label]:flex-row z-10 ' onSubmit={handleSubmit} >
        <label htmlFor="name">
          Nombre:
          <input name='name' ref={inputRef.name} type="text" minLength={6} />
        </label>
        <label htmlFor="detail">
          Detalles:
          <textarea name="detail" ref={inputRef.detail} className='textarea-md' minLength={6} ></textarea>
        </label>
        <label htmlFor="imageUrl">
          Imagen:
          <input name='imageUrl' ref={inputRef.imageUrl} type="file" onChange={handleOnChange} />
        </label>
        {
          imageRender && <img src={imageRender} alt="imagen seleccionada por el usuario para crear una nueva entrada" className='w-full max-w-72 self-center  object-cover object-center rounded-2xl' />
        }
        <input type="submit" value="Crear trabajo" className='btn btn-outline ' />
      </form>
    </div>
  )
}

export default NewWork