import Modal from './Modal.js';

import login from "../assets/login.png";

export default function Login() {
    return (
        <>
            <figure className="header-icon-container">
                <a href="#login"><img className="header-icon" src={login} alt="Login icon"></img></a>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>Login</figcaption>
            </figure>

            <Modal modalId={"login"} padding={"8rem"}>
                <div className="login-container">
                    <p className='card__description'>Email:</p>
                    <p className='card__description'>Password:</p>
                </div>
            </Modal>
        </>
    )
}