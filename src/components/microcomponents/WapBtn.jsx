import React from 'react'
import wapIcon from '../../assets/wapIcon.png'

function WapBtn() {
    return (
        <aside className='group'>
            <div className='fixed bottom-[2vh] right-[5vw] lg:right-[15vw] z-[200] flex items-center gap-2 opacity-90'
                data-tip="Mandar Mensaje por Whatsapp "
            >
                <span className='text-green-400 opacity-80 font-bold text-sm lg:hidden group-hover:flex'> Comunicate por whatsapp </span>
                <a href="https://wa.link/5fopiz" target='_blank' className='h-12 w-12 lg:h-16 lg:w-16 avatar group-hover:scale-110' >
                    <img src={wapIcon} alt="Logo de whatsapp" loading="lazy" />
                </a>
            </div>
        </aside>
    )
}

export default WapBtn