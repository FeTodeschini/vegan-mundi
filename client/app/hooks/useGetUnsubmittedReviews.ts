import { setUnsubmittedReviews } from "@/redux/slices/reviewSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useGetUnsubmittedReviews(){
    const dispatch = useDispatch();

    // Get unsubmitted reviews from loacalstorage for the scenario in which the user reloaded thepage or changed tabs without submitting a pending review
    useEffect(()=> {
        const unsubmittedReviewsString = localStorage.getItem("unsubmittedReviews");

        if (unsubmittedReviewsString) {
            const unsubmittedReviews = JSON.parse(unsubmittedReviewsString);
     
            if (Object.keys(unsubmittedReviews).length > 0) {
              dispatch(setUnsubmittedReviews(unsubmittedReviews));
            }
     }

    }, [])
}