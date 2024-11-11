'use client';
import { ModalProps } from "@/_types/ui-components";
import '../_styles/modal.css';

export default function Modal({ padding, closeModal, children }: ModalProps) {
    return (
        <div className='modal'>
            <div className="modal-container" style={{ padding: `${padding}rem` }}>
                <a className="modal-close" onClick={closeModal}>&times;</a>
                {children}
            </div>
        </div>
    );
}