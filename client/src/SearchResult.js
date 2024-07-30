import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "./StateProvider.js";
import { addPreSignedUrlToArray } from "./utils/functions.js";
import FilteredClasses from "./FilteredClasses.js";

import config from "./utils/config.js";

import './css/main.css';

export default function SearchResult(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    const { setKeyword } = useContext(StateContext);

    // Get the query string from the URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');

    // Fetches from the DB all records matching the keyword searched
    async function getResults() {
        let data = await fetch(`${config.serverEndpoint}classes/filter/${keyword}`);
        data = await data.json();
        setFilterResult([...data]); 
    }

    useEffect(()=>{
        setKeyword(queryParams.get('keyword'));
    }, [])

    useEffect( ()=> {
        getResults();
    },[keyword])

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

    const results = filterResult.length;

    if (isLoading){
        return(<p>Loading...</p>);
    }
    else {
        return (
            <FilteredClasses images={images} title={`${results} result${results !== 1 ? "s" : "" } found for your search`} subTitle={`Keyword: ${keyword}`}/>            
            )        
    }

}