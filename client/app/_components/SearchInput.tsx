'use client';

import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from 'next/navigation';
import { PrimitiveTypeProp } from "../_types/global";

async function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>, keyword: string, router: ReturnType<typeof useRouter>) {
    console.log('onKeyUp triggered');
    if (e.key === "Enter") {
        handleSearch(keyword, router);
    } }

function handleSearch(keyword: string, router: ReturnType<typeof useRouter>){
    console.log('handleSearch called with:', keyword);
    if (keyword.length > 3) {
        router.push(`/search?keyword=${keyword}`);
    }
}

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
                <button type="button" className="search__button" onClick={()=>handleSearch(keyword, router)}>
                    <img className="search__icon"  src="/assets/magnifying-glass.svg" alt="Magnifying Glass" />
                </button>
            </div>
        </>
    )
}