import axios from "axios"
import React, { useEffect, useRef, useState } from 'react'
import { urlUser } from '../utils/urlStore.js'
import { useUserHandler } from "../hooks/useUserHandler.js"


function AdminDashboard() {
  const [imageRender, setImageRender] = useState(null)
  const [imageToSend, setImageToSend] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const { updateUser } = useUserHandler()
  const inputRef = {
    name: useRef(),
    email: useRef(),
    info: useRef(),
    profileImage: useRef(),
    password: useRef()
  }

  useEffect(() => {
    try {
      axios(urlUser)
        .then(res => setUserDetails(res.data.Users[0]))


    } catch (error) {

    }
  }, [])

  const handlePasswordVisible = (e) => {
    e.preventDefault()
    isPasswordVisible ? setIsPasswordVisible(false) : setIsPasswordVisible(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      name: inputRef.name.current.value || userDetails.name,
      email: inputRef.email.current.value || userDetails.email,
      info: inputRef.info.current.value || userDetails.info,
      password: inputRef.password.current.value,
      profileImage: userDetails.profileImage
    }
    updateUser(newUser, userDetails._id, userDetails.profileImage, imageToSend)
  }



  const handleOnChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0];
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
    <section className="flex flex-col w-5/6 mx-auto text-slate-500">
      <h3 className="self-center p-1 mb-3 border-b-2">Panel de Control del Usuario</h3>
      <form className={`
                shadow-xl p-5 md:p-12 rounded-xl drop-shadow-lg bg-[#caebda] bg-opacity-65
                flex flex-col gap-4 items-end text-sm lg:text-2xl
                [&_label]:flex [&_label]:gap-2 [&_label]:items-end [&_label>input]:rounded-md [&_label>input]:p-1 [&_label>input]:ps-3 [&_label>textarea]:rounded-md [&_label]:flex-col lg:[&_label]:flex-row  z-10 
            `}
        onSubmit={handleSubmit} >
        <label htmlFor="name">
          <div className="flex justify-between w-full">
            <span className="order-0">Nombre:</span>
            <span className="caveat text-primary order-0">{userDetails?.name}</span>
          </div>
          <input name='name' ref={inputRef.name} type="text" className="order-2 " />
        </label>
        <label htmlFor="email">
          <div className="flex justify-between w-full">
            <span className="order-0">Correo electrónico:</span>
            <span className="caveat text-primary order-0">{userDetails?.email}</span>
          </div>
          <input name='email' ref={inputRef.email} type="text" className="order-2" />
        </label>
        <label htmlFor="password">
          Contraseña:
          <div className="flex">
            <input name='password' ref={inputRef.password} type={isPasswordVisible ? 'text' : 'password'} placeholder="Sólo para cambio de contraseña" className="placeholder:text-sm placeholder:opacity-60 rounded-md p-1 ps-3 " />
            {
              isPasswordVisible
                ?
                <button onClick={handlePasswordVisible} id="passwordVisible" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </button>
                :
                <button onClick={handlePasswordVisible} id="passwordNotVisible">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>

            }
          </div>
        </label>
        <label htmlFor="info" >
          <div className="flex flex-col items-end">
            <span className="text-end">Texto a mostrar en sección "sobre mí":</span>
            <span className="caveat text-primary">{userDetails?.info}</span>
            <textarea name="info" ref={inputRef.info} className='textarea-lg text-xs w-full rounded-md'  ></textarea>
          </div>
        </label>
        <label htmlFor="image" className="backdrop-blur-2xl" >
          Imagen:
          <input name='image' ref={inputRef.profileImage} type="file" className="w-full" onChange={handleOnChange} />
          {
            imageRender ?
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={imageRender} alt={imageRender ? 'imgrender' : 'profile'} className='w-full h-full object-cover' loading="lazy" />
                </div>
              </div>
              :
              <div className="avatar">
                <div className="w-24 rounded-full">
                  <img src={userDetails?.profileImage} alt={imageRender ? 'imgrender' : 'profile'} className='w-full h-full object-cover' loading="lazy" />
                </div>
              </div>
          }
        </label>
        <div className="flex flex-col md:flex-row gap-3">
          <button className="btn btn-outline" onClick={(e) => { e.preventDefault(); setImageRender(null) }} >Descartar imagen</button>
          <input type="submit" value="Guardar cambios" className='btn btn-outline ' />
        </div>
      </form>
    </section>

  )
}

export default AdminDashboard;