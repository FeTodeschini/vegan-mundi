import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { addPreSignedUrlToArray } from "./utils/functions.js";
import FilteredClasses from "./FilteredClasses.js";

import config from "./utils/config.js";
import './css/main.css';

export default function CategoryClasses(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    // Get the query string from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    // Fetches from the DB all classes matching the category
    async function getResults() {
        let data = await fetch(`${config.serverEndpoint}classes/category/${category}`);
        data = await data.json();
        setFilterResult([...data]); 
    }

    useEffect( ()=> {
        getResults();
    },[])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useEffect( ()=> {
        if (filterResult.length > 0) {
            addPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);
        } else
        {
            setIsLoading(false);
            setImages([]);
        }
    }, [filterResult])

    const classes = filterResult.length;

    return (
        <FilteredClasses images={images} title={`${classes} class${classes !== 1 ? "es" : "" } in this category`} subTitle={`Category: ${category}`}/>            
    )
}
