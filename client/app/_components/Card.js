import CardTopImage from './CardTopImage';
import CardContent from './CardContent';

import '../_styles/card.css';

export default function Card({ imgSource, imgLink, linkState, isVideo, title, description, descriptionList, bgColor, callOutTag, children}){
    // Creates an object for applying a background color style in case a bgColor was received by the Card 
    const style = bgColor !== undefined ? {backgroundColor: bgColor} : {};

    // Think of a better implementation for avoiding prop drilling
    return (
        <div className="card" style={style} key={title}>
            { imgSource !== undefined &&
                <CardTopImage 
                    isVideo={isVideo}
                    imgLink={imgLink}
                    linkState={linkState}
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