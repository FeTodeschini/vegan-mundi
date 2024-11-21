import Button from "./Button";
import { useDispatch } from "react-redux";
import { CookingClassProps } from "@/_types/cooking-class";
import { removeItem } from "../redux/slices/cartSlice";

export default function ButtonRemoveFromCart({item}: CookingClassProps) {
    const dispatch = useDispatch();
    
    return (
        <Button 
            bgColor={"green"} 
            type={"button"} 
            size={"medium"} 
            onClick={()=>dispatch(removeItem(item))}
        >
                Remove Item
        </Button>
    )
}
