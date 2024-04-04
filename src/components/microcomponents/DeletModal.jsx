import React from 'react'
import '../../style/DeleteModal.css'

const DeleteModal = ({ isOpen, onClose, onDelete, children }) => {
    if (!isOpen) return null;

    return (
        <div className="min-h-screen w-full fixed top-0 left-0 z-[100] bg-black bg-opacity-35 flex items-center justify-center">
            <div className="bg-white drop-shadow-lg p-5 rounded-lg text-black">
                {children}
                <button onClick={onDelete} className='btn btn-ghost text-red-600 font-bold me-3' >Eliminar</button>
                <button onClick={onClose} className=' btn btn-ghost font-bold' >Cancelar</button>
            </div>
        </div>
    );
};

export default DeleteModal