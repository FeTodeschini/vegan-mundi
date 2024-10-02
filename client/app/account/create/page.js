'use client'

import { useContext, useEffect, useRef } from "react";
import { StateContext } from "../../StateProvider";
import axios from "axios";

import SuccessMessage from "../../_components/SuccessMessage";
import ErrorMessage from "../../_components/ErrorMessage";
import { useFocus } from "../../hooks/useFocus";
import Logo from "../../_components/Logo";
import SectionHeader from "../../_components/SectionHeader";
import Button from "../../_components/Button";

import config from "../../_lib/config";
import "../../_styles/form.css";   

export default function CreateAccount() {
    const focusElement = useFocus();
    const { responseMessage, setResponseMessage, error, setError } = useContext(StateContext);

    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    useEffect(()=>{
        setResponseMessage("");
        setError("");
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = focusElement.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const accountData = {firstName, lastName, email, password };

        async function createAccount() {
            
            try {
                const response = await axios.post(`${config.serverEndpoint}account/create`, accountData);
                setResponseMessage(response.data);
                setError("");
            }
            catch (err) {
                setResponseMessage("");
                setError(err.message);
                console.log(`Error received: ${err}`);
            }
        }

        createAccount();
    }

    return (
            <div className="form-container">
                <div className="logo-center">
                    <Logo />
                </div>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-title">
                        <SectionHeader title="Create your account" />
                    </div>

                    <label htmlFor="firstName" className='form-label'>First Name:</label>
                    <input ref={focusElement} className="form-input" id="firstName" required/>

                    <label htmlFor="lastName" className='form-label'>Last Name:</label>
                    <input ref={lastNameRef} className="form-input" id="lastName" required/>

                    <label htmlFor="email" className='form-label'>E-mail:</label>
                    <input ref={emailRef} className="form-input" id="email" required/>

                    <label htmlFor="password" className='form-label'>Password:</label>
                    <input ref={passwordRef} className="form-input" type="password" id="password" required />

                    <label htmlFor="retypePassword" className='form-label'>Re-type your Password:</label>
                    <input className="form-input" type="password" id="retypePassword" required />
                    
                    {console.log(`responseMessage: ${responseMessage}`)}

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
                    <Button type="button" size="full" bgColor="green" isSubmit="true">
                        Create Account
                    </Button> 
                    </div>
                </form>
            </div>
     )
}