import { SelectedCookingClassWithPrices } from "./cooking-class";

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
    closeModal: () => void;
    additionalClass: string
}

export interface CartState {
    cartQuantity: number;
    cartAmount: number;
    cartItems: SelectedCookingClassWithPrices[];
}