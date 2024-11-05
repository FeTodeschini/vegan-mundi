import { toggleDarkBackground } from "../_lib/functions";
import useSetToken from "@/hooks/useSetToken";
export default function Menu(){
    const token = useSetToken();

    return (
        <div className="menu">
            <div id="menuToggle">
                <input type="checkbox" id="menuCheckbox" onClick={() => toggleDarkBackground(false)}/>
                <span className="menu-icon-top"></span>
                <span></span>
                <span className="menu-icon-bottom"></span>
                <ul className="menu-items">
                    { token && <a href="/classes/myclasses"><li>My Classes</li></a> }
                    <a href="#"><li>Delivery Methods</li></a>
                    <a href="#"><li>Classes Catalog</li></a>
                    <a href="#free-classes"><li>Free Classes</li></a>
                    <a href="#prices"><li>Prices</li></a>
                    <a href="#"><li>Contact Us</li></a>
                </ul>
            </div>
        </div>
    )
}

