import { useContext } from "react";
import { Link } from 'react-router-dom';
import { StateContext } from "../StateProvider.js";
import { useFocus } from "../hooks/useFocus";
import Logo from "../components/Logo";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

import "../css/form.css";

export default function SigninForm() {
    const { setError } = useContext(StateContext);
    const focusElement = useFocus();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //Validation
        
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
                <input className="form-input" type="password" id="password" required />
                
                <div className="form-btn">
                    <Button type="button" size="full" bgColor="green" isSubmit="true">Sign in</Button> 
                </div>

            </form>

            <div className="form-btn">
                <div className="form-title">
                    <SectionHeader subTitle="New to Vegan Mundi?" />
                </div>

                <Link to="/create-account">
                    <Button type="button" size="full">
                        Create Account
                    </Button>
                </Link>
            </div>

        </div>
    )
}