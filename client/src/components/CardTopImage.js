import { Link } from 'react-router-dom';
import iconPlay from '../assets/icon-play.svg';

export default function CardTopImage({isVideo, imgLink, linkState, imgSource}){
    return (
        <div className="card__img-wrapper">
            <Link to={imgLink} state={linkState}><img className="img-medium" src={imgSource}></img></Link>
            
            {/* displays the play button for playing the video in case the image of the card is a link to a video ( playVideo=true) */}
            {isVideo && 
                <Link to={imgLink} state={linkState}><img className='icon-play' src={iconPlay}></img></Link>
            }
        </div>
    )
}