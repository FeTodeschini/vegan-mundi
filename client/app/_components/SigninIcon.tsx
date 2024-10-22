import Link from "next/link";
import { useContext } from "react";
import { StateContext } from "@/StateProvider";

export default function SigninIcon() {

    const { userInfo } = useContext(StateContext);
    
    return (
            <figure className="header-icon-container">
                <Link href="/account/signin"><img className="header-icon" src="/assets/login.png" alt="Login icon"></img></Link>
                <figcaption className='font-primary-dark uppercase bold header-icon__caption'>{userInfo?.firstName}</figcaption>
            </figure>
    )
}