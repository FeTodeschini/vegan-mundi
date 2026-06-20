'use client';

import { useEffect } from "react";
import config from '../_lib/config';
import { SectionData } from "../_types/section-data"

const PRESIGN_RETRIES = 5;
const PRESIGN_DELAY_MS = 350;

async function delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}


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
        }
    }, [dependencyArray])

    // Add to any array of Images the pre-signed URL required from AWS for private S3Bucket objects to be accessed
    async function addPreSignedUrlToArray(sectionData: T[], bucket: string, setImages: (arg: T[]) => void, setIsLoading: (arg: boolean)=> void) {
        try {
            const s3Objects: T[] = await Promise.all(
                sectionData.map(async (item) => {
                    const photo = item.PHOTO;
                    for (let attempt = 1; attempt <= PRESIGN_RETRIES; attempt += 1) {
                        const response = await fetch(`${config.serverEndpoint}s3/${bucket}/${photo}`);

                        if (response.ok) {
                            const preSignedUrl = await response.json();
                            return { ...item, PRE_SIGNED_URL: preSignedUrl }
                        }

                        if (attempt === PRESIGN_RETRIES) {
                            throw new Error(`Failed to fetch pre-signed URL: ${response.status}`);
                        }

                        await delay(PRESIGN_DELAY_MS * attempt);
                    }

                    // Defensive fallback for TypeScript control-flow completeness.
                    throw new Error("Failed to fetch pre-signed URL");
                })
            )
            setImages(s3Objects);
        } catch (error) {
            console.error("Error generating pre-signed URLs:", error);
            setImages([]);
        } finally {
            setIsLoading(false);
        }
    }

}