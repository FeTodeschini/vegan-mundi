import ReviewStarsContainer from "./ReviewStarsContainer";
import ExpandableText from "./ExpandableText";
import { Dispatch, SetStateAction } from "react";

export default function ReviewDisplay({stars, reviewTitle, reviewText, setReloadPage, itemIndex}: 
        {stars: number | undefined, 
            reviewTitle: string | undefined, 
            reviewText: string | undefined, 
            isReviewed: boolean,
            itemIndex: number,
            setReloadPage: Dispatch<SetStateAction<{ [key: string]: boolean }>>;}) {

    return (
        <div className="card__section">
            <ReviewStarsContainer classId={null} stars={stars} classTitle={null}/>
            {reviewText!=="" && 
                <ExpandableText labelShowMore={"Show Review"} labelShowLess={"Hide Review"} setReloadPage={setReloadPage} itemIndex={itemIndex}>
                    <div className="regular-text-small bottom-margin--mini">
                        <p className="bold">{reviewTitle}</p>
                        <p>{reviewText}</p>
                    </div>
                </ExpandableText>
            }
        </div>
    )
}