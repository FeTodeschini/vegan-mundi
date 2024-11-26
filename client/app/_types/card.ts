
import { ChildrenProps } from "./global"

export interface CardProps extends ChildrenProps {
    key: string,
    bgColor?: string,
    additionalClass?: string
}

export interface CardTopImageProps {
    imgSource?: string,
    imgLink?: string,
    isVideo?: boolean,
}

export interface CardTitleProps {
    callOutTag?: string;
    children: React.ReactNode;
}
