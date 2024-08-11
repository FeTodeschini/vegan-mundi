import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-vegan-mundi.png";

export default function Logo() {
    const navigate = useNavigate();  
    
    return <img className="logo" src={logo} alt="Vegan Mundi logo" onClick={()=>navigate("/")}/>
}