import React, { useState } from 'react';
import { useGetSectionDataWithS3Image } from '../hooks/useGetSectionDataWithS3Image.js';
import { useAddPreSignedUrlToArray } from '../hooks/useAddPreSuignedUrlToArray.js';
import SectionHeader from './SectionHeader.js';
import Button from './Button.js';
import Card from './Card.js';

import '../css/main.css';
import leaf from '../assets/icon-leaf.svg';

export default function Categories() {

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    // Retrieves all classes categories from the database
    useGetSectionDataWithS3Image(setSectionData, 'classes/categories');

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(sectionData, 'vegan-mundi-thumbnails', setImages, setIsLoading);

    // checks if API calls are still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>loading...</p>);
    }
    else {

        return (
            <>
                <section className="classes-categories container">
                    <SectionHeader 
                        title="Pick the class level that best fits your needs and skills" 
                        subTitle="3 Levels of Classes"/>
                    <div className="grid-auto-fit">
                        {images.map( item => 
                            <Card 
                                title={item.TITLE} 
                                imgSource={item.PRE_SIGNED_URL}
                                imgLink={`/category-classes?category=${encodeURIComponent(item.TITLE)}`} 
                                callOutTag={item.LEVEL}
                                description={item.DESCRIPTION}

                                // Split the items of a recipe's list that are stored altogether in a single field in the database, 
                                // separated by a delimiter ("|") instead of them being stored in individual rows in a related table
                                descriptionList={
                                    item.DESCRIPTION_ITEMS_LIST.split("|").map(item => {
                                        return (
                                            <div className='card__items-list' key={item}>
                                                <img className='icon-list' src={leaf} alt="Leaf icon" />
                                                <p>{item}</p>
                                            </div>
                                        )
                                        }
                                    )
                                }
                                key= {item.PRE_SIGNED_URL}
                            >
                                <Button additionalClass="top-margin--small" link={`/category-classes?category=${encodeURIComponent(item.TITLE)}`}>See Classes &rarr;</Button>
                            </Card>
                        )}

                    </div>
                </section>
            </>
        )
    }
 
}