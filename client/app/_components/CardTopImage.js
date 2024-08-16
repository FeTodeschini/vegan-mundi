import Link from 'next/link';
import iconPlay from '../../public/assets/icon-play.svg';
import Image from 'next/image';

export default function CardTopImage({isVideo, imgLink, linkState, imgSource}){
    return (
        <div className="card__img-wrapper">
            <Link href={imgLink} state={linkState}><img className="img-medium" src={imgSource}></img></Link>
            
            {/* displays the play button for playing the video in case the image of the card is a link to a video ( playVideo=true) */}
            {isVideo && 
                <Link href={imgLink} state={linkState}><img className='icon-play' src={iconPlay.src}></img></Link>
            }
        </div>
    )
}