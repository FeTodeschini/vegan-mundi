'use client';

import { useEffect } from "react";
import config from '../_lib/config.js';

export function useAddPreSignedUrlToArray(dependencyArray, s3BucketName, setImages, setIsLoading) {

    useEffect( ()=> {
        if (dependencyArray.length > 0) {
            addPreSignedUrlToArray(dependencyArray, s3BucketName, setImages, setIsLoading);
        } else
        {
            setIsLoading(false);
            setImages([]);
        }
    }, [dependencyArray])

    // Add to any array of Images the pre-signed URL required from AWS for private S3Bucket objects to be accessed
    async function addPreSignedUrlToArray(sectionData, bucket, setImages, setIsLoading) {
        const s3Objects = await Promise.all(
            sectionData.map(async (item) => {
                const photo = item.PHOTO;
                const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${photo}`);
                const preSignedUrl = await response.json();
                return { ...item, PRE_SIGNED_URL: preSignedUrl}
            })
        )
        setImages(s3Objects);
        setIsLoading(false);
    }

}