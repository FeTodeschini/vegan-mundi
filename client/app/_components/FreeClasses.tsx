'use client';

import React, { useState } from 'react';
import { useGetSectionData } from '../hooks/useGetSectionData';
import { useAddPreSignedUrlToArray } from '../hooks/useAddPreSignedUrlToArray';
import SectionHeader from './SectionHeader';
import { CookingClassRecipe } from '@/_types/cooking-class.js';
import '../_styles/free-classes.css';
import Card from './Card';

export default function FreeClasses() {

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<CookingClassRecipe[]>([]);
    const [sectionData, setSectionData] = useState<CookingClassRecipe[]>([]);

    // Retrieves all free classes from the database
    useGetSectionData(setSectionData, 'classes/free');

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
                    {images.map((item)=>(
                        <Card key={item.TITLE}>
                            <Card.TopImage 
                                imgSource={item.PRE_SIGNED_URL}
                                imgLink={`/videoplayer/${item.VIDEO}`}
                                isVideo={true}
                            />
                            <Card.Title>{item.TITLE}</Card.Title>
                            <Card.Content>{item.DESCRIPTION}</Card.Content>
                        </Card>
                    ))}
                </div>

            </section>
               
        )
    }
 
}