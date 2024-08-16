import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { useRouter } from 'next/navigation';
import magnifyingGlass from "../../public/assets/magnifying-glass.svg";

async function handleKeyUp(e, keyword, router) {
    // In case user presses ENTER and types more than 3 letters, calls the API that fetches classes from the DB based on the keyword typed
    if (e.key === "Enter" && keyword.length > 3) {
        router.push(`/search?keyword=${keyword}`);
    } }

export default function SearchInput({ placeholder }){
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
                    <img className="search__icon"  src={magnifyingGlass.src} alt="Magnifying Glass" />
                </button>
            </div>
        </>
    )
}