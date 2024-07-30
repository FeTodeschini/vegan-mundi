// import login from "../assets/login.svg";
import login from "../assets/login.png";

export default function Login() {
    return (
        <figure className="header-icon-container">
            <img className="header-icon" src={login} alt="Login icon"></img>
            <figcaption className='font-primary-dark uppercase bold header-icon__caption'>Login</figcaption>
        </figure>
    )
}