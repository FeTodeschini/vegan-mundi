import Link from 'next/link';
import { CardContentProps, CardProps, CardTitleProps } from "../_types/card"
import { CardTopImageProps } from '../_types/card'
import '../_styles/card.css';
import { ChildrenProps } from '@/_types/global';

export default function Card({ bgColor, key, additionalClass="", children}: CardProps){
    // Creates an object for applying a background color style in case a bgColor was received by the Card 
    const style = bgColor !== undefined ? {backgroundColor: bgColor} : {};

    // Think of a better implementation for avoiding prop drilling
    return (
        // Before Typescript, the key was defined as key={title}, but Typescript complains 
        <div className={`card${style ? ` ${additionalClass}` : ''}`} style={style} key={key}>
            { children }
        </div>
    )
}


function TopImage({isVideo, imgLink, imgSource}: CardTopImageProps){
    return (
        <div className="card__img-wrapper">
            <Link href={imgLink!}>
                <img className="img-medium" src={imgSource} />
            </Link>
            
            {/* displays the play button for playing the video in case the image of the card is a link to a video ( playVideo=true) */}
            {isVideo && 
                <Link href={imgLink!}>
                    <img className='icon-play' src="/assets/icon-play.svg" />
                </Link>
            }

            {/* The code below opens the videoplayer in a new tab, but the page layout is messed up */}
            {/* <Link href={imgLink} legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                    <img className="img-medium" src={imgSource} />
                </a>
            </Link> */}
        </div>
    )
}

function Title({ callOutTag, children}: CardTitleProps){
    return (
        <div className="card__section">
            {/* JSX for card content when there is no call out tag */}
            {callOutTag === undefined && 
                <>
                    <div className='card__title'>{children}</div>
                </>
            }
            
            {/* JSX for card content when there is a call out tag */}
            {callOutTag !== undefined && 
                <>
                    <div className="card__call-out-container">
                        <div className='card__title'>{children}</div>
                        <div className="card__call-out-tag">{callOutTag}</div>
                    </div>
                </>
            }
        </div>
)}

function Description({ children }: ChildrenProps){
        return (
            <div className="card__section">
                    <p className='card__description'>{children}</p>
            </div>
)}

function Content({children }: ChildrenProps) {
    return (
        <div className='card__section'>
            <div className='card__description-list'>
                { children }
            </div>
        </div>
)}

Card.TopImage = TopImage;
Card.Title = Title;
Card.Description = Description;
Card.Content = Content;