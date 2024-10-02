import axios from "axios";
import config from './config.js';

export async function getPreSignedUrl(bucket, key) {
    const response = await axios(`${config.serverEndpoint}s3/${bucket}/${key}`);
    return response.data;
}

// the parameter isToggleMenu defines if a click on the menuCheckbox should be forced
// the parameter will be true when the function is called from darkBackground (the div with a 70% opacity background) and false when called by the menuCheckbox
export function toggleDarkBackground(isToggleMenu){
    const darkBackground = document.getElementById("darkBackground");
    const style = darkBackground.style.display === "" ? "block" : "";

    darkBackground.style.display = style;

    if (isToggleMenu){
        toggleMenu();
    }
}

export async function getPrices() {
    var data = await fetch(`${config.serverEndpoint}/prices`);
    data = await data.json();

    if (data.lenght > 0) {
        return [...data];
    }
    return [];
}

function toggleMenu(){
    const menuCheckbox = document.getElementById("menuCheckbox")
    menuCheckbox.checked = !menuCheckbox.checked;
}