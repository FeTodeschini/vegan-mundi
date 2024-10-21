import CardTopImage from './CardTopImage';
import CardContent from './CardContent';

import { CardProps } from "../_types/card"

import '../_styles/card.css';

export default function Card({ imgSource, imgLink, isVideo, title, description, descriptionList, bgColor, callOutTag, children}: CardProps){
    // Creates an object for applying a background color style in case a bgColor was received by the Card 
    const style = bgColor !== undefined ? {backgroundColor: bgColor} : {};

    // Think of a better implementation for avoiding prop drilling
    return (
        // Before Typescript, the key was defined as key={title}, but Typescript complains 
        <div className="card" style={style} key={title?.toString()}>
            { imgSource !== undefined &&
                <CardTopImage 
                    isVideo={isVideo}
                    imgLink={imgLink}
                    imgSource={imgSource}
                />
            }

            <div className="card__content">
                <CardContent 
                    callOutTag={callOutTag}
                    title={title}
                    description={description}
                    descriptionList={descriptionList}
                />

                {/* Any additional content passed by the parent component */}
                {children}  
            </div>
        </div>
    )
}