import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './utils/functions.js';
import { getPreSignedUrl } from './utils/functions.js';

export default function VideoPlayer() {
    
    const location = useLocation();
    const[videoName, setVideoName] = useState(location.state);
    const[preSignedUrl, setPreSignedUrl] = useState("");
    const [isVideoLoaded, setIsVideoLoaded ] = useState(false);

    const videoRef = useRef(null);

    useEffect(()=>{
        // gets the pre-signed URL required by AWS for accessing private S3 objects
        getPreSignedUrl(setPreSignedUrl, 'vegan-mundi-videos', videoName).then((res)=>{
            setPreSignedUrl(res);
        })
    },[])

    useEffect(()=> {
        // loads the video once the pre-signed URL is returned
        const video = videoRef.current;

        video.load();

        const handleVideoLoaded = () => {
            setIsVideoLoaded(true);
        }

        // loadedmetadata event is triggered when the video metadata is loaded
        video.addEventListener('loadedmetadata', handleVideoLoaded);

        // remove the vent listener to prevent memory leak
        return () => {
             video.removeEventListener('loadedmetadata', handleVideoLoaded);
        }
    }, [preSignedUrl])


    useEffect(()=> {
        // plays the video once its metadata is loaded
        const video = videoRef.current;

        if (isVideoLoaded) {
            video.play();
        }
    }, [isVideoLoaded])

    return (
        <div className="video-player">
            <video ref={videoRef} preload="none" controls style={{width: "100vw", height: "100vh"}}>
                <source src={preSignedUrl} type="video/mp4"></source>
            </video>
        </div>
    )
}