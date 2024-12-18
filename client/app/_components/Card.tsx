import Link from 'next/link';
import { ChildrenProps } from '../_types/global';
import React from 'react';
import { CardProps, CardTitleProps } from "../_types/card"
import { CardTopImageProps } from '../_types/card'
import '../_styles/card.css';

function CardComponent({ bgColor, additionalClass="", children}: CardProps){
    // Creates an object for applying a background color style in case a bgColor was received by the Card 
    const style = bgColor !== undefined ? {backgroundColor: bgColor} : {};

    return (
        // Before Typescript, the key was defined as key={title}, but Typescript complains 
        <div className={`card${style ? ` ${additionalClass}` : ''}`} style={style}>
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
        </div>
    )
}

function Title({ callOutTag, children}: CardTitleProps){
    return (
        <>
            {/* JSX for card content when there is no call out tag */}
            {callOutTag === undefined && 
                    <div className='card__title'>{children}</div>
            }
            
            {/* JSX for card content when there is a call out tag */}
            {callOutTag !== undefined && 
                <div className="card__call-out-container">
                    <div className='card__title'>{children}</div>
                    <div className="card__call-out-tag">{callOutTag}</div>
                </div>
            }
        </>
)}

function Content({ children }: ChildrenProps){
    return (
        <div className="card__section">
                {children}
        </div>
)}

function Footer({ children }: ChildrenProps){
    return (
        <div className='card__footer'>
            {children}
        </div>
    )}

type CardType = React.MemoExoticComponent<typeof CardComponent> & {
    TopImage: typeof TopImage;
    Title: typeof Title;
    Content: typeof Content;
    Footer: typeof Footer;
};

// Memoize the component and assign static properties
const Card = React.memo(CardComponent) as CardType;

Card.TopImage = TopImage;
Card.Title = Title;
Card.Content = Content;
Card.Footer = Footer;

export default Card;