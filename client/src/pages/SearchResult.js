import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider.js";
import { useAddPreSignedUrlToArray } from "../hooks/useAddPreSuignedUrlToArray.js";
import FilteredClasses from "../components/FilteredClasses.js";

import config from "../utils/config.js";

import '../css/main.css';

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
        let response = await axios.get(`${config.serverEndpoint}classes/filter/${keyword}`);
        setFilterResult([...response.data]); 
    }

    useEffect(()=>{
        setKeyword(queryParams.get('keyword'));
    }, [])

    useEffect( ()=> {
        getResults();
    },[keyword])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);

            const results = filterResult.length;

    if (isLoading){
        return(<p>Loading...</p>);
    }
    else {
        return (
            <FilteredClasses images={images} resultsFound={results} title={`${results} result${results !== 1 ? "s" : "" } found for your search`} subTitle={`Keyword: ${keyword}`}/>            
            )        
    }

}