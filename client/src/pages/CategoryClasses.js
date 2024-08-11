import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAddPreSignedUrlToArray } from "../hooks/useAddPreSuignedUrlToArray.js";
import FilteredClasses from "../components/FilteredClasses.js";

import config from "../utils/config.js";
import '../css/main.css';

export default function CategoryClasses(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    // Get the query string from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    // Retrieves from the DB all classes matching the category
    async function getResults() {
        let response = await axios.get(`${config.serverEndpoint}classes/category/${category}`);
        setFilterResult([...response.data]); 
    }

    useEffect( ()=> {
        getResults();
    },[])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);

            const classes = filterResult.length;

    return (
        <FilteredClasses images={images} title={`${classes} class${classes !== 1 ? "es" : "" } in this category`} subTitle={`Category: ${category}`}/>            
    )
}
