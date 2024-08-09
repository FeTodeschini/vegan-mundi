import '../css/modal.css';

export default function Modal({modalId, padding, children}){
    return (
        <div id={modalId} className='modal'>
                <div className="modal-container" style={{padding: padding}}>
                    <a href="#" className="modal-close">&times;</a>
                    { children }
                </div>
        </div>
    )
}