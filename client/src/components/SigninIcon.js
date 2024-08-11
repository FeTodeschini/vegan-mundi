import login from "../assets/login.png";
import { Link } from 'react-router-dom';

export default function SigninIcon() {
    return (
            <figure className="header-icon-container">
                <Link to="signin"><img className="header-icon" src={login} alt="Login icon"></img></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>Signin</figcaption>
            </figure>
    )
}