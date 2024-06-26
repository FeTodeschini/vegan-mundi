import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './utils/functions.js';
import { getPreSignedUrl } from './utils/functions.js';

export default function VideoPlayer() {
    
    const location = useLocation();
    const[videoName, setVideoName] = useState(location.state);
    const[preSignedUrl, setPreSignedUrl] = useState("");

    useEffect(()=>{
        const url = getPreSignedUrl(setPreSignedUrl, 'vegan-mundi-videos', videoName)
        console.log(`preSignedUrl: ${preSignedUrl}`);
    },[])

    return (
        <div className="video-player">
            <video controls autoPlay style={{width: "100vw", height: "100vh"}}>
                <source src={preSignedUrl} type="video/mp4"></source>
            </video>
        </div>
    )
}