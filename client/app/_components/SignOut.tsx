'use client'

import SectionHeader from "./SectionHeader";
import Button from "./Button";
import { useContext } from 'react';
import { StateContext } from "../StateProvider";
import { useRouter } from "next/navigation";
import "../_styles/form.css";
import { signOutCleanUp } from "@/_lib/accountHelper";

export default function SignOut() {
    const { setUserInfo, setToken } = useContext(StateContext);
    const router = useRouter();

    const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Resets User info and token and navigate to Home page
        signOutCleanUp(setUserInfo, setToken);
        router.push(`/`);
    }

    return (
        <form onSubmit={(e)=>handleSignOut(e)} className="form">

            <div className="form-title">
                    <SectionHeader title="Sign Out" />
            </div>

            <div className="form-btn">
                <Button type="button" size="full" bgColor="green" isSubmit="true">Sign Out</Button> 
            </div>

        </form>
    )
}