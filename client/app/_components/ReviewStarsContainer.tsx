import StarFull from "./StarFull";
import StarEmpty from "./StarEmpty";

export default function ReviewStarsContainer({classId=null, classTitle=null, stars}:
                        {classId: number | null, classTitle: string | null, stars: number | undefined}){
    return (
        <div className="review__container">
            <div className="review__star-container">
                {Array.from({ length: 5 }, (_, i) => (
                    <span className="review__star-display">
                        {(i + 1 <= stars!) ? 
                            <StarFull key={i}/> 
                        : 
                            <StarEmpty key={i}/>
                        }
                    </span>
                ))}
            </div>
            <p className="review__text-container">
                {stars !== null ? 
                        <>
                            <span>{stars}</span> {classId !== null && (
                                <>
                                    <a className="review__text-all-reviews" href={`/review/${encodeURIComponent(classId)}/${encodeURIComponent(classTitle as string)}`}>See all reviews</a> 
                                </>
                            )}
                        </>
                    : 
                        <p className="review__text-no-reviews">No reviews yet</p>
                }
            </p>
        </div>
    )
}