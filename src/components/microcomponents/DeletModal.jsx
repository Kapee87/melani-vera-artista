import React from 'react'
import '../../style/DeleteModal.css'

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>¿Estás seguro de que deseas eliminar este trabajo?</p>
                <button onClick={onDelete} className='delete' >Eliminar</button>
                <button onClick={onClose} className='cancel' >Cancelar</button>
            </div>
        </div>
    );
};

export default DeleteModal