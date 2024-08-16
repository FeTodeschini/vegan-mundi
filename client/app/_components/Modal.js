import '../_styles/modal.css';

export default function Modal({ padding, children}){
    return (
        <div className='modal'>
                <div className="modal-container" style={{padding: `${padding}rem`}}>
                    <a href="#" className="modal-close">&times;</a>
                    { children }
                </div>
        </div>
    )
}