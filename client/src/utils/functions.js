import config from './config.js';

// Call the proper API that fetches data from the database for a specific session in a page and stores it in the sectionData state variable
export async function getSectionData(setSectionData, api) {
    let data = await fetch(`${config.serverEndpoint}${api}`);
    data = await data.json();
    setSectionData([...data]);
}

// Add to any array of Images the pre-signed URL required from AWS for private S3Bucket objects to be accessed
export async function addPreSignedUrlToArray(sectionData, bucket, setImages, setIsLoading) {
    const s3Objects = await Promise.all(
        sectionData.map(async (item) => {
            const photo = item.PHOTO;
            const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${photo}`);
            const preSignedUrl = await response.json();
            return { ...item, PRE_SIGNED_URL: preSignedUrl}
        })
    )
    setImages(s3Objects);
    setIsLoading(false);
}

export async function getPreSignedUrl(setPreSignedUrl, bucket, key) {
    const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${key}`);
    const data = await response.json();
    // setPreSignedUrl(data);
    return data;
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

function toggleMenu(){
    const menuCheckbox = document.getElementById("menuCheckbox")
    menuCheckbox.checked = !menuCheckbox.checked;
}