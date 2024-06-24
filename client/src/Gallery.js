import { useEffect, useState } from "react";
import SectionHeader from "./ui-components/SectionHeader.js";
import { getSectionData, addPreSignedUrl } from './utils/functions.js'

import './css/gallery.css';

export default function Gallery (){

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    // Fetch all gallery info from the database
    useEffect( ()=> {
        getSectionData(setSectionData, 'gallery')
    } , []);

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useEffect( ()=> {
        if (sectionData.length > 0) {
            addPreSignedUrl(sectionData, 'vegan-mundi-gallery', setImages, setIsLoading);
        }
    }, [sectionData])

    // checks if API calls are still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>loading...</p>);
    }
    else {

        return (
            <section className="gallery-container">
                <div className="container">
                    <SectionHeader title="Pictures of our happy students" subTitle="Gallery" />
                </div>    
                <div className="gallery__content grid-auto-fit">
                    {
                        images.map((item) => {
                            return (
                                <figure key={item.PRE_SIGNED_URL}>
                                    <div className="gallery__img--container">
                                        <img
                                            className="gallery__img" 
                                            src={item.PRE_SIGNED_URL}
                                        />
                                    </div>
                                    <figcaption className="gallery__caption">{item.LABEL}</figcaption>
                                </figure>)
                        }
                    )}
                </div>
             </section>
        )
    }
}