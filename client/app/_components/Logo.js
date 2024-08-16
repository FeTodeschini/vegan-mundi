import Link from "next/link";
import logo from "../../public/assets/logo-vegan-mundi.png";

export default function Logo() {
    return <Link href="/"><img className="logo" src={logo.src} alt="Vegan Mundi logo"/></Link>
}