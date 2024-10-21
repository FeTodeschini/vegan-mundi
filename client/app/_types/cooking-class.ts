export interface CookingClass {
    CATEGORY_ID: number,
    TITLE: string,
    DESCRIPTION: string,
    PHOTO: string,
    CLASSES_LIST: string,
    PRE_SIGNED_URL?: string
}

export interface SelectedCookingClass extends CookingClass{
    CATEGORY_TITLE: string,
    PRICE_ID: number,
    PRICE_DESCRIPTION: string,
    PRICE: number,
    MULTIPLE_STUDENTS: boolean,
    STUDENTS: number,
    MIN_STUDENTS_DISCOUNT: number,
    DISCOUNT: number,
}

export interface SelectedCookingClassWithPrices extends SelectedCookingClass{
    PRICE_TYPE_ID: number,
    PRICE_TYPE_DESCRIPTION: string,
}

export interface CookingClassDeliveryMethods {
    ID: number,
    TITLE: string,
    DESCRIPTION: string,
    DISPLAY_ORDER: number,
    ICON: string
    PHOTO: string,
    PRE_SIGNED_URL?: string
}

export interface CookingClassCategory {
    CATEGORY_ID: number,
    TITLE: string,
    PHOTO: string,
    DESCRIPTION: string,
    DISPLAY_ORDER: number,
    LEVEL: string,
    DESCRIPTION_ITEMS_LIST: string,
    PRE_SIGNED_URL?: string
}

export interface CookingClassRecipe {
    RECIPE_ID: number, 
    TITLE: string
    DESCRIPTION: string
    PHOTO: string,
    VIDEO: string,
    PUBLISH_DATE: string,
    DISPLAY_ORDER: number
    PRE_SIGNED_URL? : string
}