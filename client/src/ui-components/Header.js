import Logo from './Logo.js';
import SearchInput from './SearchInput.js';
import Login from './Login.js';
import Menu from './Menu.js';

import "../css/menu.css";

export default function Header({ children }) {

    return (
        <>
            <div className="header">
                <Logo />
                <div className="header__action-icons">
                    <Login />
                    <Menu />
                </div>
                {/* This is the Search Input. It was passes as children to avoid prop drilling, as it requires setFilterResult that is defined in the Landing Page  */}
                { children }
            </div>
        </>
    )
}



