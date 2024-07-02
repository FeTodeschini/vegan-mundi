import Logo from './Logo.js';
import SearchInput from './SearchInput.js';
import Login from './Login.js';
import Menu from './Menu.js';
import Footer from './Footer.js';

import "../css/menu.css";
import { Outlet } from 'react-router-dom';

export default function Header({ placeholder }) {

    return (
        <>
            <div className="header">
                <Logo />
                <div className="header__action-icons">
                    <Login />
                    <Menu />
                </div>
                
                <SearchInput 
                        placeholder={"What do you want to cook today? (type at least 4 letters)"}
                />
            </div>

            <Outlet />

            {/* <Footer /> */}
        </>
    )
}



