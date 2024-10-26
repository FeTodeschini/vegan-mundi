'use client'

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import { useAddPreSignedUrlToArray } from "../../hooks/useAddPreSuignedUrlToArray";
import FilteredClasses from "../../_components/FilteredClasses";
import useSetToken from "@/hooks/useSetToken";
import { CookingClass } from "@/_types/cooking-class"
import config from "../../_lib/config";
import '../../_styles/main.css';


export default function CategoryClasses(){
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
            let response = await axios.get(`${config.serverEndpoint}classes/category/${category}`);
            console.log("Classes X categories:", JSON.stringify(response.data));
            setCategoryTitle(response.data.CATEGORY_title);
            setFilterResult([...response.data.classes]); 
        }

        getResults();
    },[category])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(filterResult, 'vegan-mundi-thumbnails', setImages, setIsLoading);
    const classes = filterResult.length;
    
    return (
        <FilteredClasses images={images} title={`${classes} class${classes !== 1 ? "es" : "" } in this category`} subTitle={`Category: ${categoryTitle}`}/>            
    )
}