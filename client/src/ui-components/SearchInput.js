import magnifyingGlass from "../assets/magnifying-glass.svg";

export default function SearchInput(){
    return(
        <form action="#" className="header__search">
            <input type="text" className="search__input" placeholder="What do you want to cook today?"></input>
            <button className="search__button">
                <img className="search__icon"  src={magnifyingGlass} alt="Magnifying Glass" />
            </button>
        </form>
    )
}