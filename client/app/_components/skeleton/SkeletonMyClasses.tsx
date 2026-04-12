import Tab from "./Tab"
import Tabs from "./Tabs"
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonMyClass from "./SkeletonMyClass";

const SkeletonMyClasses = () => {
    return (
        <div className="tab-content">
            <div className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                <SkeletonMyClass/>
                <SkeletonMyClass/>
                <SkeletonMyClass/>
            </div>
        </div>
    )
}

export default SkeletonMyClasses;