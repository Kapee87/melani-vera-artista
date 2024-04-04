import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export function Contacto() {
    const [formAlert, setFormAlert] = useState({
        "show": false,
        "success": false,
        "msj": ""
    })
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const userName = form.current.user_name.value.trim();
        const userEmail = form.current.user_email.value.trim();
        const message = form.current.message.value.trim();

        if (!userName || !userEmail || !message) {
            setFormAlert({ "show": true, "msj": "Por favor complete todos los campos", "success": false });
            return;
        }

        if (!validateEmail(userEmail)) {
            setFormAlert({ "show": true, "msj": "Por favor ingrese un correo electrónico válido", "success": false });
            return;
        }

        emailjs
            .sendForm('service_t7vlvyl', 'template_n07iudp', form.current, {
                publicKey: 'SP_tQzY09cF-J4HaS',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setFormAlert({ "show": true, "msj": "El mensaje fue enviado correctamente", "success": true })
                    const timeout = setTimeout(() => {
                        setFormAlert({ "show": false, "msj": "", "success": false })
                        clearTimeout(timeout)
                    }, 5000);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setFormAlert({ "show": true, "msj": "Hubo un error enviando el mensaje, intente de nuevo más tarde", "success": false })
                    const timeout = setTimeout(() => {
                        setFormAlert({ "show": false, "msj": "", "success": false })
                        clearTimeout(timeout)
                    }, 5000);
                },
            );
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <section id='contact' className='min-h-screen flex flex-col items-center caveat text-2xl relative'>
            <form className='flex flex-col gap-4 [&_label]:text-primary-content [&_input]:text-accent [&_textarea]:text-accent [&_input]:rounded-md [&_textarea]:rounded-md [&_input]:flex  [&_input]:max-w-7xl [&_input]:w-max' ref={form} onSubmit={sendEmail}>
                <label >
                    Nombre:
                    <input type="text" name='user_name' />
                </label>
                <label >
                    Correo Electrónico:
                    <input type="text" name='user_email' />
                </label>
                <label className='flex flex-col'>
                    Mensaje:
                    <textarea name="message" id="" cols="100" rows="10" className='max-w-64 lg:max-w-7xl' ></textarea>
                </label>
                {
                    formAlert.show
                        ?
                        <div className={`tooltip ${formAlert.success ? 'text-success' : 'text-error'}`}>
                            <p>{formAlert?.msj} </p>
                        </div>
                        : ''
                }
                <input type="submit" value="Enviar" className='btn btn-outline bg-slate-800 bg-opacity-95 text-3xl' />

            </form>
        </section>

    )
}