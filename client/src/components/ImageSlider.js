import React from "react";
import { useState, useEffect } from "react";

import '../css/image-slider.css';

import chevronLeft from "../assets/chevron-left.svg";
import chevronRight from "../assets/chevron-right.svg";

export default function ImageSlider({ images }) {

    const [imageIndex, setImageIndex] = useState(0);

    function showPreviousImage () {
        setImageIndex(index => {
            if (index === 0) return images.length - 1;
            return index - 1;
        })
    }

    function showNextImage () {
        setImageIndex(index => {
            if (index === images.length - 1) return 0;
            return index + 1;
        })
    }

    return (
        <div className="img-slider__container">
            <div className="img-slider">
                {images.map(image => (
                    <figure className="img-slider__figure">
                        <img key={image.PHOTO} className="img-slider__img" src={`https://s3-us-east-2.amazonaws.com/vegan-mundi-gallery/${image.PHOTO}`} alt={`image ${image.PHOTO}`} style={{ translate: `${-100 * imageIndex }%` }}></img>
                        <figcaption className="img-slider__caption" style={{ translate: `${-100 * imageIndex }%` }}>{image.LABEL}</figcaption>
                    </figure>
                ))}

                <button className="img-slider__btn" onClick={showPreviousImage}><img src={ chevronLeft } alt="Left arrow for navigating the image slider" /></button>
                <button className="img-slider__btn img-slider__btn--right" onClick={showNextImage}><img src={ chevronRight } alt="Right arrow for navigating the image slider" /></button>

                <div className="img-slider__dots-bar">
                    {images.map((_, index) => (
                    <button key={index} className= {index === imageIndex ? "img-slider__dot img-slider__dot-selected" : "img-slider__dot"} onClick={()=> setImageIndex(index)}></button>
                ))}
                </div>
                
                <p className="yellow-ribbon img-slider__yellow-ribbon">Real Students</p>
                
            </div>
        </div>
            
    )
}


