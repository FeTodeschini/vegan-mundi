'use client'

import { useContext, useRef, useEffect } from "react";
import Link from 'next/link';
import { StateContext } from "../StateProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useFocus } from "../hooks/useFocus";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import SectionHeader from "./SectionHeader";
import Button from "./Button";
import config from "../_lib/config";
import "../_styles/form.css";


export default function SignIn() {
    const focusElement = useFocus();
    const { responseMessage, setResponseMessage, error, setError, setUserInfo, setToken, token } = useContext(StateContext);
    const router = useRouter();
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
                const response = await axios.post(`${config.serverEndpoint}account/signin`, signinData);
                setResponseMessage("Signin successfull");
                setError("");
                
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", JSON.stringify(token));

                const userInfo = response.data.userInfo;
                setUserInfo(userInfo);
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                
                router.push(`/`);
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
        <>
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
                    <SectionHeader subTitle="New to Vegan Mundi?" />

                    <div className="form-btn">
                        <Link className="" href="/account/create">
                            <Button type="button" size="full">
                                Create Account
                            </Button>
                        </Link>
                    </div>
            </div>



        </>
    )
}