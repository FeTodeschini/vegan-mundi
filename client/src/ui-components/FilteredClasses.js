import { useState, useEffect } from "react";
import Card from "./Card"
import { addPreSignedUrlToArray } from "../utils/functions";
import SeactionHeader from './SectionHeader.js';
import Button from "./Button.js";

import '../css/main.css';

export default function FilteredClasses({ filterKeyWord, filterResult, setFilterExecuted }){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);

    useEffect( ()=> {
        if (filterResult.length > 0) {
            addPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);
        } else
        {
            setIsLoading(false);
            setImages([]);
        }
    }, [filterResult])

    const results = filterResult.length;
    
    if (isLoading){
        return(<p>Loading...</p>);
    }
    else {
        return (
            <div className="container">
                <Button size="medium" additionalClass={"btn--back-home"} onClick={()=>setFilterExecuted(false)}>&larr; Back to home</Button>
                <SeactionHeader title={`${results} result${results !== 1 ? "s" : "" } found for your search`} subTitle={`Keyword: ${filterKeyWord}`}/>
                <div className="grid-auto-fit">
                    {images.map(item=>(
                        <Card 
                            imgSource={item.PRE_SIGNED_URL}
                            imgLink="/videoplayer" 
                            linkState={item.VIDEO}
                            title={item.TITLE} 
                            description={item.DESCRIPTION} 
                            key={item.PRE_SIGNED_URL}
                        >
                            <div className="flex-col">
                                <Button bgColor={"green"} type={"button"} size={"medium"}>Add to cart</Button>
                                <Button size={"medium"}>Learn More &rarr;</Button>
                            </div>
                        </ Card>
                    ))}
                </div>
            </div>            
            )        
        }
    }