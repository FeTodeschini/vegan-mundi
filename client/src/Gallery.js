import { useEffect, useState } from "react";
import SectionHeader from "./ui-components/SectionHeader.js";

import './css/gallery.css';

export default function Gallery (){

    const [isLoading, setIsLoading] = useState(true);
    const [gallery, setGallery] = useState([]);
    const [images, setImages] = useState([]);

    //  Fetches the names of all gallery images from the database
    useEffect( ()=> {
        async function getGallery() {
            var data = await fetch('http://3.22.160.2:4000/gallery');
            data = await data.json();
            setGallery([...data]);
        }

        getGallery();
    } , []);

    // Add the pre-signed URL to each item of the gallery images array
    useEffect(()=> {
        async function getS3Objects() {
            const s3Objects = await Promise.all(
                gallery.map(async (item) => {
                    const photo = item.PHOTO;
                    const response = await fetch(`http://3.22.160.2:4000/s3/vegan-mundi-gallery/${photo}`);
                    const preSignedUrl = await response.json();
                    return { ...item, preSignedUrl: preSignedUrl}
                })
            )

            setImages(s3Objects);
            setIsLoading(false);
        }

        if (gallery.length > 0) {
            getS3Objects();
        }
    } , [gallery]);

    // checks if API call is still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
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
                        images.map((image) => {
                            return (
                                <figure>
                                    <div className="gallery__img--container">
                                        <img
                                            className="gallery__img" 
                                            src={image.preSignedUrl}
                                        />
                                    </div>
                                    <figcaption className="gallery__caption">{image.LABEL}</figcaption>
                                </figure>)
                        }
                    )}
                </div>
             </section>
        )
    }
}