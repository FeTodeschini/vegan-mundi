import StarFull from "./StarFull";
import StarEmpty from "./StarEmpty";
import ExpandableText from "./ExpandableText";

export default function ReviewDisplay({stars, reviewText} : {stars: number | undefined, reviewText: string | undefined}) {
    return (
        <div>
            <div className="review__container">
                <div className="review__star-container">
                    {Array.from({ length: 5 }, (_, i) => (
                        <span className="review__star-display">
                            {(i + 1 <= stars!) ? <StarFull/> : <StarEmpty/>}
                        </span>
                    ))}
                </div>
            <p className="review__star-text">{stars}</p>
            </div>
            
            <ExpandableText labelShowMore={"Show Review"} labelShowLess={"Hide Review"}>
                    {reviewText}
            </ExpandableText>
        </div>
    )
}