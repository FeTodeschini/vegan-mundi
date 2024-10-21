import { CardContentProps } from "../_types/card"

export default function CardContent({ callOutTag, title, description, descriptionList }: CardContentProps){
        return (
            <>
                {/* JSX for card content when there is no call out tag */}
                {callOutTag === undefined && 
                    <>
                        {/* <p className='card__title'>{titleIcon && <img className="img-small" src={titleIcon} />} {title}</p> */}
                        <p className='card__title'>{title}</p>
                        <p className='card__description'>{description}</p>
                        <div className="card__description-list">
                            { descriptionList }
                        </div>
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
            </>
)}