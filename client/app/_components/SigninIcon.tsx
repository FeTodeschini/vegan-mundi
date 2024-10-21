import Link from "next/link";

export default function SigninIcon() {
    return (
            <figure className="header-icon-container">
                <Link href="/account/signin"><img className="header-icon" src="/assets/login.png" alt="Login icon"></img></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>Signin</figcaption>
            </figure>
    )
}