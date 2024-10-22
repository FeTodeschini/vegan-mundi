'use client'

import SignIn from "@/_components/SignIn"
import SignOut from "@/_components/SignOut"
import Logo from "@/_components/Logo";
import "@/_styles/form.css";

export default function Page() {

    const isSignedIn = !(localStorage.getItem("userInfo") === null)

    return (
        <div className="form-container">
            <div className="logo-center">
                <Logo />
            </div>
            
            <div>
                { isSignedIn ?
                        <SignOut/>
                    :
                        <SignIn />
                }
            </div>

        </div>
    )
}