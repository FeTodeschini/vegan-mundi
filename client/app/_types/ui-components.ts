import { ReactNode } from 'react'
import {  CookingClass } from './cooking-class'
import { ChildrenProps } from './global'

export interface ModalProps extends ChildrenProps {
    padding: string,
    closeModal: () => void;
}

export interface SectionHeaderProps {
    title?: string,
    subTitle?: string
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
    children: ReactNode
}


