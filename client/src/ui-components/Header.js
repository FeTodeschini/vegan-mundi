import Logo from './Logo.js';
import SearchInput from './SearchInput.js';
import Login from './Login.js';
import Menu from './Menu.js';

import "../css/menu.css";

export default function Header() {

    return (
        <>
            <div className="header">
                <Logo />
                <div className="header__action-icons">
                    <Login />
                    <Menu />
                </div>
                <SearchInput />
            </div>
        </>
    )
}



