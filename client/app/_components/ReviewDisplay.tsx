import ReviewStarsContainer from "./ReviewStarsContainer";
import ExpandableText from "./ExpandableText";

export default function ReviewDisplay({stars, reviewText, isReviewed=false}: 
        {stars: number | undefined, reviewText: string | undefined, isReviewed: boolean}) {
    return (
        <div>
            <ReviewStarsContainer stars={stars} isReviewed={isReviewed} />
            {reviewText!=="" && 
                <ExpandableText labelShowMore={"Show Review"} labelShowLess={"Hide Review"}>
                    {reviewText}
                </ExpandableText>
            }
        </div>
    )
}