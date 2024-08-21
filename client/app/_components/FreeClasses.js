import React, { useState, useEffect } from 'react';
import { useGetSectionDataWithS3Image } from '../hooks/useGetSectionDataWithS3Image.js';
import { useAddPreSignedUrlToArray } from '../hooks/useAddPreSuignedUrlToArray.js';
import SectionHeader from './SectionHeader.js';
import Card from './Card.js';

import '../_styles/free-classes.css';

export default function FreeClasses() {

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    // Retrieves all free classes from the database
    useGetSectionDataWithS3Image(setSectionData, 'classes/free');

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(sectionData, 'vegan-mundi-thumbnails', setImages, setIsLoading);

    // checks if API calls are still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>Loading...</p>);
    }
    else {
    
        return (
            <section className="free-classes container" id="free-classes">
                
                <SectionHeader 
                    title="Watch short classes for free"
                    subTitle="Free Classes"/>
                
                <div className="free-classes__list grid-auto-fit">
                    {images.map(item=>(
                        <Card 
                            imgSource={item.PRE_SIGNED_URL}
                            imgLink={`/videoplayer/${item.VIDEO}`} 
                            isVideo={true}
                            title={item.TITLE} 
                            description={item.DESCRIPTION} 
                            key={item.PRE_SIGNED_URL}
                        />
                    ))}
                </div>

            </section>
               
        )
    }
 
}