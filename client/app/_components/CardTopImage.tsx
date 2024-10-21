import Link from 'next/link';

import { CardTopImageProps } from '../_types/card'

export default function CardTopImage({isVideo, imgLink, imgSource}: CardTopImageProps){
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