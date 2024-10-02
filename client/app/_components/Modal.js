import { StateContext } from "../StateProvider.js";
import { useContext } from "react";

import '../_styles/modal.css';

export function Modal({ padding, children}){

    const { closeModal } = useModal();
    return (
        <div className='modal'>
                <div className="modal-container" style={{padding: `${padding}rem`}}>
                    <a className="modal-close" onClick={()=>closeModal()}>&times;</a>
                    { children }
                </div>
        </div>
    )
}

export function useModal() {
    const { isModalOpen, setIsModalOpen } = useContext(StateContext);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return { isModalOpen, openModal, closeModal };
}