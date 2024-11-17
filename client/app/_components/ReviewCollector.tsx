import ReviewInput from "./ReviewInput";
import ReviewStars from "./ReviewStars";
import { ReduxRootState } from "@/_types/redux";
import { useSelector } from "react-redux";

export default function ReviewCollector ({ classId, unsubmittedReview }: { classId: number, unsubmittedReview: { stars: number; reviewText: string }}){
    const { isReviewVisible } = useSelector((state: ReduxRootState)=> state.review)

     // check if user left the page without submitting a review they started providing or if they never started reviewing the class
    const stars = unsubmittedReview?.stars !== undefined ? unsubmittedReview.stars : null;
    const reviewText = unsubmittedReview?.reviewText !== undefined ? unsubmittedReview.reviewText : null;
   
    return (
        <div className="full-width">
            <ReviewStars classId={classId} pendingStars={stars}/>
            {isReviewVisible[classId] && 
                <ReviewInput key={classId} classId={classId} pendingReviewText={reviewText}/>
            }
        </div>
    )
}