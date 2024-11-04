'use client';

import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from 'next/navigation';
import { PrimitiveTypeProp } from "@/_types/global";

async function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>, keyword: string, router: ReturnType<typeof useRouter>) {
    // In case user presses ENTER and types more than 3 letters, calls the API that fetches classes from the DB based on the keyword typed
    if (e.key === "Enter" && keyword.length > 3) {
        router.push(`/search?keyword=${keyword}`);
    } }

export default function SearchInput({ placeholder }: PrimitiveTypeProp<string>){
    const { keyword, setKeyword } = useContext(StateContext);
    const router = useRouter();   

    return(
        <>
            <div className="header__search">
                <input 
                    value={keyword}
                    type="text"
                    className="search__input"
                    placeholder={placeholder} 
                    onChange={(e)=>setKeyword(e.target.value)}
                    onKeyUp={(e)=>handleKeyUp(e, keyword, router)}
                />
                <button type="button" className="search__button">
                    <img className="search__icon"  src="/assets/magnifying-glass.svg" alt="Magnifying Glass icon" />
                </button>
            </div>
        </>
    )
}