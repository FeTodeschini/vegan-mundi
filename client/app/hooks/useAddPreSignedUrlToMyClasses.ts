import { addPreSignedUrlToString } from '../_lib/s3Helper';
import { useEffect } from 'react';
import { MyCookingClass } from '../_types/cooking-class';

export default function useAddPreSignedUrlToMyClasses(classes: MyCookingClass[],setClassesPreSignedUrl: (arg: MyCookingClass[]) => void){
    useEffect(() => {
        const addPreSignedUrl = async () => {
            const updatedClasses = await Promise.all(classes.map(async (item: MyCookingClass) => {
                if (item.CLASSES_LIST) {
                    const recipes = JSON.parse(item.CLASSES_LIST);
                    // Add pre signed Url to each recipe in the list of recipes per Class (item.CLASSES_LIST)
                    const recipesPreSignedUrl = await Promise.all(recipes.map(async (recipe: any) => {
                        const photoPreSignedUrl = await addPreSignedUrlToString('vegan-mundi-thumbnails', recipe.PHOTO);
                        return { ...recipe, PHOTO: photoPreSignedUrl };
                    }));
                    // update CLASSES_LIST with pre signed urls
                    return { ...item, CLASSES_LIST: recipesPreSignedUrl };
                }

                return undefined;
            }));

            const preSignedClasses = updatedClasses.filter((item): item is MyCookingClass => item !== undefined)
            setClassesPreSignedUrl(preSignedClasses);
        };

        addPreSignedUrl();

    }, [classes]);
}
