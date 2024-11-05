'use client' 
import { StateContext } from "../StateProvider";
import { useContext } from "react";
import { ModalProps } from "@/_types/ui-components";

import '../_styles/modal.css';

export function Modal({ padding, children}: ModalProps){

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
        if (setIsModalOpen){
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        if (setIsModalOpen){
            setIsModalOpen(false);
        }
    };

    return { isModalOpen, openModal, closeModal };
}