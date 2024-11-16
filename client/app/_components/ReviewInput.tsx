import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { submitReview, cancelReview, saveUnsubmittedReview } from "@/redux/slices/reviewSlice";
import { DispatchType } from "@/redux/store"
import { useState } from "react";
import { ReduxRootState } from "@/_types/redux";

// Component with the text area for the review and a submit button that dispatches the submitReview reducer action
export default function ReviewInput({ classId, pendingReviewText } : {classId: number, pendingReviewText: string | null}){
    const { isReviewVisible, email } = useSelector((state: ReduxRootState)=> state.review)
    const styleVisible = isReviewVisible ? {display: "block"} : {display: "none"}
    const [reviewText, setReviewText] = useState(pendingReviewText || "")

    const dispatch = useDispatch<DispatchType>();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const reviewText = e.target.value
        setReviewText(reviewText);
        const unsubmittedReview = {
            classId,
            stars: null,
            reviewText
        }
        dispatch(saveUnsubmittedReview(unsubmittedReview));
     };

    function handleSubmit () {
        const stars = Number((document.getElementById(`stars[${classId}]`) as HTMLParagraphElement).innerText);
        const review = {
            email,
            classId,
            reviewText,
            stars
        };

        dispatch(submitReview(review));
    }

    return (
        <div style={styleVisible} >
            <textarea className="review__review-text" rows={5} placeholder="Write your review here"
                id={`reviewText[${classId}]`}
                onChange={handleChange}
                value={reviewText}
            />
            <div className="review__input--submit">
                <Button type="button" size="small" onClick={()=>{
                    dispatch(cancelReview({ classId }))
                }}>Cancel</Button>
                <Button type="button" bgColor="green" size="small" onClick={()=>handleSubmit()}>Submit</Button>
            </div>
        </div>
    )
}