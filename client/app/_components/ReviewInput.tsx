import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { submitReview, cancelReview, saveUnsubmittedReview } from "@/redux/slices/reviewSlice";
import { DispatchType } from "@/redux/store"
import { useState } from "react";
import { ReduxRootState } from "@/_types/redux";

// Component with the text area for the review and a submit button that dispatches the submitReview reducer action
export default function ReviewInput({ classId, pendingReviewTitle, pendingReviewText }
     : {classId: number, pendingReviewTitle: string | null, pendingReviewText: string | null}){
    
    const { isReviewVisible, email } = useSelector((state: ReduxRootState)=> state.review)
    const styleVisible = isReviewVisible ? {display: "block"} : {display: "none"}
    const [reviewText, setReviewText] = useState(pendingReviewText || "")
    const [reviewTitle, setReviewTitle] = useState(pendingReviewTitle || "")

    const dispatch = useDispatch<DispatchType>();

     const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reviewTitle = e.target.value
        setReviewTitle(reviewTitle);
        const unsubmittedReview = {
            classId,
            stars: null,
            reviewTitle,
            reviewText: null,
        }
        dispatch(saveUnsubmittedReview(unsubmittedReview));
     };

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const reviewText = e.target.value
        setReviewText(reviewText);
        const unsubmittedReview = {
            classId,
            stars: null,
            reviewTitle: null,
            reviewText
        }
        dispatch(saveUnsubmittedReview(unsubmittedReview));
    };

    function handleSubmit () {
        const stars = Number((document.getElementById(`stars[${classId}]`) as HTMLParagraphElement).innerText);
        const review = {
            email,
            classId,
            reviewTitle,
            reviewText,
            stars
        };

        dispatch(submitReview(review));
    }

    return (
        <div style={styleVisible} >
            <input type="text" className="review__review-text bottom-margin--micro" 
                placeholder="Add a title to your review here"
                id={`reviewTitle[${classId}]`}
                onChange={handleChangeTitle}
                value={reviewTitle}

            />
            <textarea className="review__review-text" rows={5} placeholder="Write your review here"
                id={`reviewText[${classId}]`}
                onChange={handleChangeText}
                value={reviewText}
            />
            <div className="review__input--submit">
                <Button type="button" size="small" onClick={()=>{dispatch(cancelReview({ classId }))}}>Cancel</Button>
                <Button type="button" bgColor="green" size="small" onClick={()=>handleSubmit()}>Submit</Button>
            </div>
        </div>
    )
}