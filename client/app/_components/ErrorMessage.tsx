import { PrimitiveTypeProp } from "../_types/global"

export default function ErrorMessage({ message }: PrimitiveTypeProp<String>) {
    return (
        <p className="error">{message}</p>
    )
}