'use client';
import { ModalProps } from "../_types/ui-components";
import '../_styles/modal.css';

export default function Modal({ additionalClass, closeModal, children }: ModalProps) {
    return (
        <div className='modal'>
            <div className={`modal-container ${additionalClass ? additionalClass : ""}`}>
                <a className="modal-close" onClick={closeModal}>&times;</a>
                {children}
            </div>
        </div>
    );
}