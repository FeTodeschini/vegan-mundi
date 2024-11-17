import StarFull from "./StarFull";
import StarEmpty from "./StarEmpty";

export default function ReviewStarsContainer({stars}: {stars: number | undefined}){
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
            <p className="review__star-text">{stars !== null ? stars : "No reviews yet"}</p>
        </div>
    )
}