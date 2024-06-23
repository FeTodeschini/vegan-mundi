import React, { useState, useEffect } from 'react';
import SectionHeader from './ui-components/SectionHeader.js';
import Card from './ui-components/Card.js';

import './css/free-classes.css';

export default function FreeClasses() {

    const [isLoading, setIsLoading] = useState(true);
    const [freeClasses, setFreeClasses] = useState([]);

    useEffect( ()=> {

        async function getFreeClasses() {
 
            try {
                var data = await fetch('http://3.22.160.2:4000/classes/free');
                data = await data.json();
                
                setFreeClasses([...data]);
                setIsLoading(false);
            }
            catch (e){
                console.log(`Error: ${e}`);
            }
 
        }

        getFreeClasses();
        
    } , []);

    // checks if API call is still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
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
                    {freeClasses.map(item=>(
                        <Card 
                            imgSource={`http://3.22.160.2:4000/assets/thumbnails/${item.PHOTO}`}
                            imgLink="/videoplayer" 
                            linkState={item.VIDEO}
                            isVideo={true}
                            title={item.TITLE} 
                            description={item.DESCRIPTION} 
                        />
                    ))}
                </div>

            </section>
               
        )
    }
 
}