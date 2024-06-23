import React, { useState, useEffect } from 'react';
import SectionHeader from './ui-components/SectionHeader.js';
import Button from './ui-components/Button.js';
import Card from './ui-components/Card.js';

import './css/main.css';
import leaf from './assets/icon-leaf.svg';

export default function ClassesCategories() {

    const [isLoading, setIsLoading] = useState(true);
    const [classesCategories, setClassesCategories] = useState([]);

    useEffect( ()=> {
        async function getClassesCategories() {
            var data = await fetch('http://3.22.160.2:4000/classes/categories');
            data = await data.json();

            setClassesCategories([...data]);
            setIsLoading(false);
        }

        getClassesCategories();
        
    } , []);

    // checks if API call is still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
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
                        {classesCategories.map( classType => 
                            <Card 
                                title={classType.TITLE} 
                                imgSource={`http://3.22.160.2:4000/assets/thumbnails/${classType.PHOTO}`}
                                callOutTag={classType.LEVEL}
                                description={classType.DESCRIPTION}

                                // Split the items of a recipe's list that are stored altogether in a single field in the database, 
                                // separated by a delimiter ("|") instead of them being stored in individual rows in a related table
                                descriptionList={
                                    classType.DESCRIPTION_ITEMS_LIST.split("|").map(item => {
                                        return (
                                            <div className='card__items-list' key={item}>
                                                <img className='icon-list' src={leaf} alt="Leaf icon" />
                                                <p>{item}</p>
                                            </div>
                                        )
                                        }
                                    )
                                }
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