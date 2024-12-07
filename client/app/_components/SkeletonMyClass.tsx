import { enumSkeletonShapes } from "@/_lib/enums"
import SkeletonShape from "./SkeletonShape"

const SkeletonMyClass = () => {
    return (
        <div className="card">
            <div className="card__title">
                <SkeletonShape shape={enumSkeletonShapes.CLASS_TITLE}/> 
            </div>
            <div className="card__title">
                <SkeletonShape shape={enumSkeletonShapes.CLASS_TITLE}/> 
            </div>            
            <div className="card__section">
                <SkeletonShape shape={enumSkeletonShapes.CLASS_DESCRIPTION}/>
            </div>
            <div className="myclasses__classes-list">
                <SkeletonShape shape={enumSkeletonShapes.IMAGE}/><span className="align-self--c"><SkeletonShape shape={enumSkeletonShapes.SINGLE_LINE_HALF}/></span>
                <SkeletonShape shape={enumSkeletonShapes.IMAGE}/><span className="align-self--c"><SkeletonShape shape={enumSkeletonShapes.SINGLE_LINE_HALF}/></span>
                <SkeletonShape shape={enumSkeletonShapes.IMAGE}/><span className="align-self--c"><SkeletonShape shape={enumSkeletonShapes.SINGLE_LINE_HALF}/></span>
            </div>
        </div>
    )
}

export default SkeletonMyClass;