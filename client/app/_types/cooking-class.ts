export interface CookingClass {
    CATEGORY_ID: number,
    CLASS_ID: number,
    TITLE: string,
    AVERAGE_STARS: number,
    DESCRIPTION: string,
    PHOTO: string,
    CLASSES_LIST: any,
    PRE_SIGNED_URL?: string
}

export interface CookingClassProps {
    [key: string]: CookingClass;
}

export interface SelectedCookingClass extends CookingClass{
    CATEGORY_TITLE: string,
    PRICE_ID: number,
    PRICE_DESCRIPTION: string,
    PRICE: number,
    MULTIPLE_STUDENTS: boolean,
    STUDENTS: number,
    MIN_STUDENTS_DISCOUNT: number,
    DISCOUNT_PERCENTAGE: number,
}

export interface SelectedCookingClassWithPrices extends SelectedCookingClass{
    PRICE_TYPE_ID: number,
    PRICE_TYPE_DESCRIPTION: string,
    CLASS_DATE: Date | undefined,
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

export interface CookingClassCategory extends CookingClass {
    DISPLAY_ORDER: number,
    LEVEL: string,
    DESCRIPTION_ITEMS_LIST: string,
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

export interface MyCookingClass extends CookingClass{
    CATEGORY_TITLE: string,
    DELIVERY_METHOD_ID: number;
    VIDEO: string;
    CLASS_DATE?: Date;
    STARS?: number;
    REVIEW_TEXT?: string;
}

export interface Recipe{
    RECIPE_ID: number;
    TITLE: string,
    PHOTO: string,
    DELIVERY_METHOD_ID: number;
    VIDEO: string
}