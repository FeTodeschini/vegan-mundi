import magnifyingGlass from "../assets/magnifying-glass.svg";
import config from '../utils/config.js';

async function handleKeyUp(e, filterKeyWord, setFilterKeyWord, setFilterResult, setFilterExecuted) {
    // In case user presses ENTER and types more than 3 letters, calls the API that fetches classes from the DB based on the keyword typed
    if (e.key === "Enter" && filterKeyWord.length > 3) {
        let data = await fetch(`${config.serverEndpoint}classes/filter/${filterKeyWord}`);
        data = await data.json();
        setFilterKeyWord(filterKeyWord);
        setFilterExecuted(true);
        setFilterResult([...data]);
    } }

export default function SearchInput({ placeholder, setFilterKeyWord, setFilterResult, setFilterExecuted }){
    return(
        <form action="#" className="header__search">
            <input type="text" className="search__input" placeholder={placeholder} 
                onKeyUp={(e)=>handleKeyUp(e, e.target.value, setFilterKeyWord, setFilterResult, setFilterExecuted)}></input>
            <button className="search__button">
                <img className="search__icon"  src={magnifyingGlass} alt="Magnifying Glass" />
            </button>
        </form>
    )
}