import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStars, saveUnsubmittedReview } from "@/redux/slices/reviewSlice"
import { StateContext } from "@/StateProvider";
import StarFull from "./StarFull";
import StarEmpty from "./StarEmpty";
import { PrimitiveTypeProp } from "@/_types/global";
import "@/_styles/review.css";

export default function ReviewStars({classId, pendingStars}: {classId: number | null, pendingStars: number | null}) {
  const [stars, setStars] = useState(0);
  const [tempStars, setTempStars] = useState(0);

  const { userInfo } = useContext(StateContext)
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (pendingStars !==null)
      handleStars(pendingStars);
  },[])

  function handleStars(stars: number) {
    const objReview = {
      email: userInfo!.email,
      classId,
      stars
    }

    const unsubmittedReview = {
      classId,
      stars,
      reviewText: null
    }

    setStars(stars);
    // saves the stars state in case user leaves the tab without submit their review
    dispatch(saveUnsubmittedReview(unsubmittedReview));
    // displays the review text area
    dispatch(addStars(objReview));
  }

  return (
    <div className="review__container">
      <div className="review__star-container">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            full={tempStars ? tempStars >= i + 1 : stars >= i + 1}
            onRate={() => handleStars(i + 1)}
            onHoverIn={() => setTempStars(i + 1)}
            onHoverOut={() => setTempStars(0)}
          />
        ))}
      </div>
      <p className="review__star-label" id={`stars[${classId}]`}>
        {tempStars || stars || <span className="review__collector-no-reviews">Provide your review!</span>}
      </p>
    </div>
  );
}

export function Star({ onRate, full, onHoverIn, onHoverOut }: {onRate: ()=>void, full: boolean, onHoverIn: ()=>void, onHoverOut: ()=>void}) {
  
    return (
      <span className="review__star"
        role="button"
        onClick={onRate}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
      >
        {full ? (
          <StarFull/>
        ) : (
          <StarEmpty/>
        )}
      </span>
    );
  }
