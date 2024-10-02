'use client'

import { useContext, useRef, useEffect } from "react";
import Link from 'next/link';
import { StateContext } from "../../StateProvider.js";
import axios from "axios";
import config from "../../_lib/config.js";
import { useFocus } from "../../hooks/useFocus.js";
import SuccessMessage from "../../_components/SuccessMessage.js";
import ErrorMessage from "../../_components/ErrorMessage.js";
import Logo from "../../_components/Logo.js";
import SectionHeader from "../../_components/SectionHeader.js";
import Button from "../../_components/Button.js";

import "../../_styles/form.css";

export default function Page() {
    const focusElement = useFocus();
    const { responseMessage, setResponseMessage, error, setError } = useContext(StateContext);
    const context = useContext(StateContext);

    if (!context) {
        console.error("StateContext is null or undefined");
    } else {
        console.log("StateContext value:", context);
    }

    const passwordRef = useRef(null);

    useEffect(()=>{
        if (setResponseMessage && setError)
        setResponseMessage("");
        setError("");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = focusElement.current.value;
        const password = passwordRef.current.value;

        const signinData = { email, password };

        async function signIn() {
            
            try {
                const response = await axios.post(`${config.serverEndpoint}signin`, signinData);
                setResponseMessage("Signin successfull");
                setError("");
            }
            catch (err) {
                setResponseMessage("");
                setError(err.message);
                console.log(`Error received: ${err}`);
            }
        }

        signIn();
    }

    return (
        <div className="form-container">
            <div className="logo-center">
                <Logo />
            </div>

            <form onSubmit={handleSubmit} className="form">

                <div className="form-title">
                        <SectionHeader title="Sign In" />
                </div>

                <label htmlFor="email" className='form-label'>Email:</label>
                <input ref={focusElement} className="form-input" type="email" id="email" required />
                
                <label htmlFor="password" className='form-label'>Password:</label>
                <input ref={passwordRef} className="form-input" type="password" id="password" required />

                {responseMessage != "" &&
                    <div>
                        <SuccessMessage message={responseMessage}/>
                    </div>
                }
                
                {error != "" &&
                    <div>
                        <ErrorMessage message={error}/>
                    </div>
                }

                <div className="form-btn">
                    <Button type="button" size="full" bgColor="green" isSubmit="true">Sign in</Button> 
                </div>

            </form>

            <div className="form-btn">
                <div className="form-title">
                    <SectionHeader subTitle="New to Vegan Mundi?" />
                </div>

                <Link href="/account/create">
                    <Button type="button" size="full">
                        Create Account
                    </Button>
                </Link>
            </div>

        </div>
    )
}