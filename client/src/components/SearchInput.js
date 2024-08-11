import { useContext } from "react";
import { StateContext } from "../StateProvider";
import { useNavigate } from "react-router-dom";
// import { useFocus } from "../hooks/useFocus"
import magnifyingGlass from "../assets/magnifying-glass.svg";

async function handleKeyUp(e, keyword, navigate) {
    // In case user presses ENTER and types more than 3 letters, calls the API that fetches classes from the DB based on the keyword typed
    if (e.key === "Enter" && keyword.length > 3) {
        navigate(`/search?keyword=${keyword}`);
    } }

export default function SearchInput({ placeholder }){
    const { keyword, setKeyword } = useContext(StateContext);
    const navigate = useNavigate();  

    return(
        <>
            <div className="header__search">
                <input value={keyword} type="text" className="search__input" placeholder={placeholder} 
                    onChange={(e)=>setKeyword(e.target.value)}
                    onKeyUp={(e)=>handleKeyUp(e, keyword, navigate)}/>
                <button type="button" className="search__button">
                    <img className="search__icon"  src={magnifyingGlass.src} alt="Magnifying Glass" />
                </button>
            </div>
        </>
    )
}