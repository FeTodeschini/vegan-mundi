import { SelectedCookingClass } from "./cooking-class";

export interface ItemCounterProps {
    minItems: number;
    maxItems: number;
    initialItems: string;
    items: string;
    setItems: (items: string) => void;
}

export interface ModalAddToCartProps {
    modalTitle: string,
    modalSubTitle: string,
    padding: string
}