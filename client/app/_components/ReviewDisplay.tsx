import ReviewStarsContainer from "./ReviewStarsContainer";
import ExpandableText from "./ExpandableText";

export default function ReviewDisplay({stars, reviewTitle, reviewText}: 
        {stars: number | undefined, reviewTitle: string | undefined, reviewText: string | undefined, isReviewed: boolean}) {
    return (
        <div className="card__section">
            <ReviewStarsContainer classId={null} stars={stars} classTitle={null}/>
            {reviewText!=="" && 
                <ExpandableText labelShowMore={"Show Review"} labelShowLess={"Hide Review"}>
                    <div className="regular-text-small bottom-margin--mini">
                        <p className="bold">{reviewTitle}</p>
                        <p>{reviewText}</p>
                    </div>
                </ExpandableText>
            }
        </div>
    )
}