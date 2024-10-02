'use client'

import axios from "axios";
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useContext } from "react";
import { StateContext } from "../StateProvider.js";
import { useAddPreSignedUrlToArray } from "../hooks/useAddPreSuignedUrlToArray.js";
import FilteredClasses from "../_components/FilteredClasses.js";
import config from "../_lib/config.js";
import '../_styles/main.css';

function SearchResultSuspense(){
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [filterResult, setFilterResult] = useState([]);

    const { setKeyword } = useContext(StateContext);

    // Get the query string from the URL
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    useEffect(()=>{
        setKeyword(keyword);
    }, [])

    useEffect( ()=> {
        //Fetches from the DB all records matching the keyword searched
        async function getResults() {
            try {
                let response = await axios.get(`${config.serverEndpoint}classes/filter/${keyword}`);
                setFilterResult([...response.data]); 
            } catch (error) {
                console.log("Error getting the results of the search")
            } finally {
                setIsLoading(false);
            }
        }

        if (keyword) {
            getResults();
        } else {
            setIsLoading(false);
        }

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

export default function SearchResult() {
    return (
        // Next.JS forces useSearchParams() to be wrappped by a Suspense Boundary otherwise the build fails,, even though it works with npm run dev
        // The function SearchResultSuspense was created to solve the Suspense situation. Before the migration from Create-REact-App to Next.JS,
        // all the code was simply inside SearchResult()

        // Next.JS documentation mentions that this can be avoided adding [missingSuspenseWithCSRBailout: false] to next.config.mjs (although
        // not recommended), but it didn't work
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResultSuspense />
        </Suspense>
    );
}