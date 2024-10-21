import { useState } from "react";
import { ChildrenProps } from "@/_types/global";

export default function ExpandableText({ children }: ChildrenProps) {

    const [isExpanded, setIsExpanded] = useState(false);

    const expandableText = isExpanded ? <>&minus; Show less...</> : <>&#43;Show more...</>

    return (
        <div className="card__expandable-text--container">
            <p className="card__expandable-text--toggle" onClick={(()=>setIsExpanded(!isExpanded))}>{expandableText}</p>
            <div className={ ` card__expandable-text--content ${isExpanded ? "" : "hidden" }`}>
                { children }
            </div>
        </div>
    )
}