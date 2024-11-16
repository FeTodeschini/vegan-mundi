import { ChildrenProps } from "./global";

export interface ButtonProps extends ChildrenProps{
    bgColor?: string,
    additionalClass?: string,
    isSubmit?: string,
    type?: 'button' | 'link';
    link?: string | null;
    size?: 'large' | 'medium' | 'small' | 'full' | 'square';
    onClick?: (...args: any[]) => any;
}