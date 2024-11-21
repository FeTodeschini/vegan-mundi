import Button from "./Button"
import { useEffect, ChangeEvent } from "react";
import "../_styles/item-counter.css";

import { ItemCounterProps } from '../_types/cart'


export default function ItemCounter({minItems, maxItems, initialItems, items, setItems}: ItemCounterProps){

     useEffect (()=> {
        setItems(initialItems);
     },[])

    const handleChangeItemCount = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numberValue = Number(value);

        // Allow empty input to clear the field
        // Validate input to be within the range 1 to 4
        if (value === '' || (!isNaN(numberValue) && numberValue >= 1 && numberValue <= 4)) {
            setItems(value);
        }
    };

    const removeItem = () => {
        const currentValue = Number(items);
        if (currentValue > minItems) {
            setItems(String(currentValue - 1));
        }
    };

    const addItem = () => {
        const currentValue = Number(items);
        if (currentValue < maxItems) {
            setItems(String(currentValue + 1));
        }
    };

    return <div className="item-counter--container">
            <Button type="button" size="square" onClick={removeItem}>-</Button>
            <input type="text" className="item-counter--input" value={items} onChange={handleChangeItemCount}/>
            <Button type="button" size="square" onClick={addItem}>+</Button>
    </div>
}