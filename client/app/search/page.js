'use client'

import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider.js";
import { useAddPreSignedUrlToArray } from "../hooks/useAddPreSuignedUrlToArray.js";
import FilteredClasses from "../_components/FilteredClasses.js";

import config from "../_lib/config.js";

import '../_styles/main.css';

export default function SearchResult(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    const { setKeyword, keyword } = useContext(StateContext);

    // Get the query string from the URL
    const searchParams = useSearchParams();

    useEffect(()=>{
        setKeyword(searchParams.get('keyword'));
    }, [])

    useEffect( ()=> {
        //Fetches from the DB all records matching the keyword searched
        async function getResults() {
            let response = await axios.get(`${config.serverEndpoint}classes/filter/${keyword}`);
            setFilterResult([...response.data]); 
        }

        getResults();
    },[keyword])

    // // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
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