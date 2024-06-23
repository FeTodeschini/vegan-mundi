import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function VideoPlayer() {
    
    const location = useLocation();
    const[videoName, setVideoName] = useState(location.state);

    return (
        <div className="video-player">
            <video controls autoPlay style={{width: "100vw", height: "100vh"}}>
                <source src={`https://vegan-mundi-videos.s3.us-east-2.amazonaws.com/${videoName}`} type="video/mp4"></source>
            </video>
        </div>
    )
}