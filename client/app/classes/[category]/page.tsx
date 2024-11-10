'use client'

import axios from "axios";
import { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from 'next/navigation'
import { useAddPreSignedUrlToArray } from "../../hooks/useAddPreSignedUrlToArray";
import FilteredClasses from "../../_components/FilteredClasses";
import useSetToken from "@/hooks/useSetToken";
import { CookingClass } from "@/_types/cooking-class"
import store from '@/redux/store'
import { Provider } from "react-redux";
import config from "../../_lib/config";
import { StateContext } from "@/StateProvider";
import '../../_styles/main.css';

export default function CategoryClasses(){
    const {userInfo} = useContext(StateContext)

    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState<CookingClass[]>([]);
    const [filterResult, setFilterResult] = useState<CookingClass[]>([]);
    const params = useParams()
    const category = params.category;
    const [categoryTitle, setCategoryTitle] = useState("");

    useSetToken()
    
    useEffect( ()=> {
        // Retrieves from the DB all classes matching the category
        async function getResults() {

            // Checks if User is logged in or not to define whether or not a param needs to be sent to the API
            const params = userInfo!.email !== "" ? {email: userInfo!.email} : null
            let response;
            const apiUrl = `${config.serverEndpoint}classes/category/${category}`

            if (params){
                response = await axios.get(apiUrl, { params });
            }
            else
                response = await axios.get(apiUrl);

            setCategoryTitle(response.data.categoryTitle);
            setFilterResult([...response.data.classes]); 
        }

        getResults();
        

    },[category])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);
    const classes = filterResult.length;

     // Memoize the images array to ensure that FilteredClasses gets a stable reference
     const memoizedImages = useMemo(() => images, [images]);
    
    return (
            <FilteredClasses images={memoizedImages} title={`${classes} class${classes !== 1 ? "es" : "" } in this category`} subTitle={`Category: ${categoryTitle}`}/>            
    )
}