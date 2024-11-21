import { useState } from "react";
import { ExpandableTextProps } from "../_types/ui-components";

export default function ExpandableText({ labelShowMore, labelShowLess, children }: ExpandableTextProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    const expandableText = isExpanded ? <>&minus; {labelShowLess}</> : <>&#43; {labelShowMore}</>

    return (
        <div className="card__expandable-text--container">
            <p className="card__expandable-text--toggle" onClick={(()=>setIsExpanded(!isExpanded))}>{expandableText}</p>
            <div className={ ` card__expandable-text--content ${isExpanded ? "" : "hidden" }`}>
                { children }
            </div>
        </div>
    )
}