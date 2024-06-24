import { useState, useEffect } from 'react';

export default function S3Object ({ objectsFromDatabase, bucket, isLoading, setIsLoading}){
    const [images, setImages] = useState([]);

    // Add the pre-signed URL to each item of the gallery images array
    useEffect(()=> {
        async function getS3Objects() {
            const s3Objects = await Promise.all(
                objectsFromDatabase.map(async (item) => {
                    const photo = item.PHOTO;
                    const response = await fetch(`http://3.22.160.2:4000/s3/${bucket}/${photo}`);
                    const preSignedUrl = await response.json();
                    return { ...item, preSignedUrl: preSignedUrl}
                })
            )

            setImages(s3Objects);
            setIsLoading(false);
        }

        if (objectsFromDatabase.length > 0) {
            getS3Objects();
        }
    } , [objectsFromDatabase]);

    // checks if API call is still being executed. If this line is ommited, than a runtime error (as freeClasses array will be empty) will occur when page is refreshed or user hits the browser's back button
    if (isLoading){
        return(<p>loading...</p>);
    }
    else {

        return (
            <>
                {
                    images.map((image) => {
                        return (
                            <figure>
                                <div className="gallery__img--container">
                                    <img
                                        className="gallery__img" 
                                        src={image.preSignedUrl}
                                    />
                                </div>
                                <figcaption className="gallery__caption">{image.LABEL}</figcaption>
                            </figure>)
                    }
                )}
            </>
        )
    }
}