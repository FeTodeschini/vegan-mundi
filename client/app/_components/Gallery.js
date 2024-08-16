import { useState } from "react";
import { useGetSectionDataWithS3Image } from "../hooks/useGetSectionDataWithS3Image.js";
import SectionHeader from "./SectionHeader.js";
import { useAddPreSignedUrlToArray } from "../hooks/useAddPreSuignedUrlToArray.js";

import Modal from "./Modal.js";

import '../_styles/gallery.css';

export default function Gallery (){

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    // Retrieves all gallery info from the database
    useGetSectionDataWithS3Image(setSectionData, 'gallery')

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(sectionData, 'vegan-mundi-gallery', setImages, setIsLoading);

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
                        images.map((item, index) => {
                            return (
                                <>
                                    <figure key={item.PRE_SIGNED_URL}>
                                        <div className="gallery__img--container">
                                            <a href={`/#${index}`}>
                                                <img
                                                    className="gallery__img" 
                                                    src={item.PRE_SIGNED_URL}
                                                />
                                            </a>
                                        </div>
                                        <figcaption className="gallery__caption">{item.LABEL}</figcaption>
                                    </figure>
                            
                                    {/* <Modal modalId={index} padding={"8"}>
                                        <div className="gallery-modal-img">
                                            <img
                                                className="gallery__img-modal" 
                                                src={item.PRE_SIGNED_URL}
                                            />
                                        </div>
                                    </Modal> */}
                                </>
                            )
                        }
                    )}
                </div>

             </section>

        )
    }
}