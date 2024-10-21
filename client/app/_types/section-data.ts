import { CookingClass, CookingClassCategory, CookingClassDeliveryMethods, CookingClassRecipe } from "./cooking-class";

export interface SectionDataGallery {
    ID: number,
    PHOTO: string,
    LABEL: string,
    PRE_SIGNED_URL?: string
}

export type SectionData = CookingClass | CookingClassDeliveryMethods | CookingClassCategory | CookingClassRecipe | SectionDataGallery;