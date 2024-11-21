import "../_styles/typography.css";

import { PrimitiveTypeProp } from "../_types/global";

export default function SuccessMessage({message}: PrimitiveTypeProp<String>){
    return (
        <p className="success">{message}</p>
    )
}