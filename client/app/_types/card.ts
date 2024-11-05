
import { ChildrenProps } from "./global"

export interface CardProps extends ChildrenProps {
    key: number,
    bgColor?: string,
    additionalClass?: string
}

export interface CardTopImageProps {
    imgSource?: string,
    imgLink?: string,
    isVideo?: boolean,
}

export  interface CardContentProps {
    callOutTag: string,
    title: string,
    description: string,
    descriptionList: string
}

export interface CardTitleProps {
    callOutTag?: string;
    children: React.ReactNode;
}
