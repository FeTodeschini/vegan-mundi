import magnifyingGlass from "../assets/magnifying-glass.svg";

export default function SearchInput(){
    return(
        <form action="#" class="header__search">
            <input type="text" class="search__input" placeholder="What do you want to cook today?"></input>
            <button class="search__button">
                <img class="search__icon"  src={magnifyingGlass} alt="Magnifying Glass" />
            </button>
        </form>
    )
}