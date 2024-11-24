import { useState } from "react";
import { ExpandableTextProps } from "../_types/ui-components";

export default function ExpandableText({ labelShowMore, labelShowLess, setReloadPage, itemIndex, children }: ExpandableTextProps) {

    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpanded = () => {
        const newExpandedState = !isExpanded;
        setIsExpanded(newExpandedState);
    
        // Trick to resize page in case the ExpandableText component is being used in a page that uses the useResponsiveCardRows hook
        //  so the div container height of the ExpandableText will be recalculated
        if (setReloadPage) {
          setReloadPage((prevState) => ({
            ...prevState,
            [itemIndex!]: newExpandedState,
          }));
        }
    };
      
    const expandableText = isExpanded ? <>&minus; {labelShowLess}</> : <>&#43; {labelShowMore}</>

    return (
        <div className="card__expandable-text--container">
            <p className="card__expandable-text--toggle" onClick={toggleExpanded}>{expandableText}</p>
            <div className={ ` card__expandable-text--content ${isExpanded ? "" : "hidden" }`}>
                { children }
            </div>
        </div>
    )
}