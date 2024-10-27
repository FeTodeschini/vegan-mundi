'use client';

import { useEffect } from "react";
import config from '../_lib/config';
import { SectionData } from "@/_types/section-data"


export function useAddPreSignedUrlToArray<T extends SectionData>(
        dependencyArray : T[],
        s3BucketName: string,
        setImages: (arg: T[]) => void,
        setIsLoading: (arg: boolean)=> void
){

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
    async function addPreSignedUrlToArray(sectionData: T[], bucket: string, setImages: (arg: T[]) => void, setIsLoading: (arg: boolean)=> void) {
        const s3Objects: T[] = await Promise.all(
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