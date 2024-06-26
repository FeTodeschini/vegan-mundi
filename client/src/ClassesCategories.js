import React, { useState, useEffect } from 'react';
import SectionHeader from './ui-components/SectionHeader.js';
import Button from './ui-components/Button.js';
import Card from './ui-components/Card.js';
import { getSectionData, addPreSignedUrlToArray } from './utils/functions.js'

import './css/main.css';
import leaf from './assets/icon-leaf.svg';

export default function ClassesCategories() {

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [sectionData, setSectionData] = useState([]);

    // Fetch all classes categories from the database
    useEffect( ()=> {
        getSectionData(setSectionData, 'classes/categories')
    } , []);

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useEffect( ()=> {
        if (sectionData.length > 0) {
            addPreSignedUrlToArray(sectionData, 'vegan-mundi-thumbnails', setImages, setIsLoading);
        }
    }, [sectionData])

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
                                <Button additionalClass="top-margin--small">See Classes &rarr;</Button>
                            </Card>
                        )}

                    </div>
                </section>
            </>
        )
    }
 
}