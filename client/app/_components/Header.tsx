import LogoHeader from "./LogoHeader";
import SearchInput from './SearchInput';
import SigninIcon from "./SigninIcon";
import Menu from "./Menu";
import CartIcon from './CartIcon';
import { useGetCartItemsFromLocalStorage } from "../hooks/useGetCartItemsFromLocalStorage";
import useSetToken from "../hooks/useSetToken";
import "../_styles/menu.css";

export default function Header() {

    useGetCartItemsFromLocalStorage()
    useSetToken();

    return (
        <div className="header-container">
            <div className="header">
                <LogoHeader />
                <div className="header__action-icons">
                    <CartIcon />
                    <SigninIcon />
                    <Menu />
                </div>
                <SearchInput placeholder={"What do you want to cook today? (type at least 4 letters)"}/>
            </div>
        </div>
    )
}



