'use client'

import { useEffect, useState } from "react";
import SignIn from "../../_components/sign/SignIn"
import SignOut from "../../_components/sign/SignOut"
import Logo from "../../_components/header/Logo";
import "../../_styles/form.css";

export default function Page() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        // Check localStorage only on the client
        setIsSignedIn(localStorage.getItem("userInfo") !== null);
    }, []);

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