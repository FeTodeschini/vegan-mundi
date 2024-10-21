
import { ChildrenProps } from "./global"

export interface CardProps extends ChildrenProps {
    imgSource?: string,
    imgLink?: string,
    isVideo?: boolean,
    title?: React.ReactNode,
    description?: string,
    descriptionList?: React.ReactNode,
    bgColor?: string,
    callOutTag?: string,
}

export interface CardContentProps { 
    callOutTag?: string,
    title?: React.ReactNode,
    description?: string,
    descriptionList?: React.ReactNode,
}

export interface CardTopImageProps {
    imgSource?: string,
    imgLink?: string,
    isVideo?: boolean,
}