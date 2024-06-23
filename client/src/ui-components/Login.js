import login from "../assets/login.svg";

export default function Login() {
    return (
        <figure className="login-container">
            <img className="login-container__icon" src={login} alt="Login icon"></img>
            <figcaption className='font-primary-dark uppercase bold login-container__caption'>Login</figcaption>
        </figure>
    )
}