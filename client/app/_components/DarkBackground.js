import { toggleDarkBackground } from "../_lib/functions"

export default function DarkBackground() {
    return (
        <>
           <div id="darkBackground" className="dark-background" onClick={() => toggleDarkBackground(true)}></div>
        </>
    )
}