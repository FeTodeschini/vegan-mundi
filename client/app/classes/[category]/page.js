'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useAddPreSignedUrlToArray } from "../../hooks/useAddPreSuignedUrlToArray.js";
import FilteredClasses from "../../_components/FilteredClasses.js";

import config from "../../_lib/config.js";
import '../../_styles/main.css';

export default function CategoryClasses(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    const params = useParams()
    const category = params.category;

    useEffect( ()=> {
        // Retrieves from the DB all classes matching the category
        async function getResults() {
            let response = await axios.get(`${config.serverEndpoint}classes/category/${category}`);
            console.log(`endPoint: ${`${config.serverEndpoint}classes/category/${category}`}`);
            setFilterResult([...response.data]); 
        }

        getResults();
    },[category])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);
    const classes = filterResult.length;
    console.log(`classes: ${classes}`);
    
    return (
        <FilteredClasses images={images} title={`${classes} class${classes !== 1 ? "es" : "" } in this category`} subTitle={`Category: ${category}`}/>            
    )
}
