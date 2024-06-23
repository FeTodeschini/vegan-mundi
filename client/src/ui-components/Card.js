import { Link } from 'react-router-dom';

import iconPlay from '../assets/icon-play.svg';

import '../css/card.css';

export default function Card({ imgSource, imgLink, linkState, isVideo, title, description, descriptionList, bgColor, callOutTag, children}){
    
    // Creates an object for applying a background color style in case a bgColor was received by the Card 
    const style = bgColor !== undefined ? {backgroundColor: bgColor} : {};

    return (
        <div className="card" style={style} key={title}>
            
            {/* 1-Image on the top of the card (it can be either an image or a video) */}
            { imgSource !== undefined &&
                <div className="card__img-wrapper">
                    <Link to={imgLink} state={linkState}><img className="img-medium" src={imgSource}></img></Link>
                    {/* displays the play button for playing the video in case the image of the card is a link to a video ( playVideo=true) */}
                    {isVideo && <Link to={imgLink} state={linkState}><img className='icon-play' src={iconPlay}></img></Link>}
                </div>
            }

            {/* 2-Card text content - Usually a title and a description*/}
            <div className="card__content">

                {/* JSX for card content when there is no call out tag */}
                {callOutTag === undefined && 
                    <>
                        {/* <p className='card__title'>{titleIcon && <img className="img-small" src={titleIcon} />} {title}</p> */}
                        <p className='card__title'>{title}</p>
                        <p className='card__description'>{description}</p>
                    </>
                }
                
                {/* JSX for card content when there is a call out tag */}
                {callOutTag !== undefined && 
                    <>
                        <div className="card__call-out-container">
                            <p className='card__title'>{title}</p>
                            <p className="card__call-out-tag">{callOutTag}</p>
                        </div>
                        
                        <p className="card__description">{description}</p>

                        { descriptionList }

                    </>
                }

                {/* 3-Any additional content passed by the parent component */}
                {children}  

            </div>

        </div>
    )
}