import { Dispatch, ReactNode, SetStateAction } from "react";
import {  CookingClass } from './cooking-class'
import { ChildrenProps, Setter } from './global'

export interface ModalProps extends ChildrenProps {
    additionalClass: string,
    closeModal: () => void;
}

export interface SectionHeaderProps {
    title?: string,
    subTitle?: string,
    titleAdditionalClass?: string
}

export interface FilteredClassesProps extends SectionHeaderProps {
    images: CookingClass[],
    resultsFound?: number,
}

export interface GalleryPictures {
    PRE_SIGNED_URL: string,
    LABEL: string
}

export interface ExpandableTextProps {
    labelShowMore: string,
    labelShowLess: string,
    setReloadPage?: Dispatch<SetStateAction<{ [key: number]: boolean }>>,
    itemIndex?: number,
    children: ReactNode
}



