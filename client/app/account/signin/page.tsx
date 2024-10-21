'use client'

import { useContext, useRef, useEffect } from "react";
import Link from 'next/link';
import { StateContext } from "../../StateProvider";
import axios from "axios";
import config from "../../_lib/config";
import { useFocus } from "../../hooks/useFocus";
import SuccessMessage from "../../_components/SuccessMessage";
import ErrorMessage from "../../_components/ErrorMessage";
import Logo from "../../_components/Logo";
import SectionHeader from "../../_components/SectionHeader";
import Button from "../../_components/Button";

import "../../_styles/form.css";

export default function Page() {
    const focusElement = useFocus();
    const { responseMessage, setResponseMessage, error, setError } = useContext(StateContext);
    const context = useContext(StateContext);

    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        setResponseMessage("");
        setError("");
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const email = focusElement.current!.value;
        const password = passwordRef.current!.value;

        const signinData = { email, password };

        async function signIn() {
            
            try {
                const response = await axios.post(`${config.serverEndpoint}signin`, signinData);
                setResponseMessage("Signin successfull");
                setError("");
            }
            catch (err: any) {
                setResponseMessage("");

                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("An unexpected error occurred."); // Fallback message in case no custom message is received
                }
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