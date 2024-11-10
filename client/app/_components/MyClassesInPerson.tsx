import TokenProvider from '@/_components/TokenProvider';
import { addPreSignedUrlToString } from '@/_lib/S3Helper';
import { MyCookingClass, Recipe } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';
import { useContext, useEffect, useState } from 'react';
import ExpandableText from './ExpandableText';
import Card from './Card';
import React from 'react';
import MyClassTitle from './MyClassTitle';
import CustomDatePicker from './CustomDatePicker';
import ClassRescheduleDisclaimer from './ClassRescheduleDisclaimer';
import { useSetClassDate } from '@/hooks/useSetClassDate';
import { handleSetMyClasstDate } from '@/_lib/MyClassesHelper';
import { StateContext } from '@/StateProvider';
import "@/_styles/myclasses.css"

export default function MyClassesInPerson({classes}:ArrayProps<MyCookingClass>) {
    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]>([]);
    const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date | null }>({});
    const { userInfo } = useContext(StateContext)

    useEffect(() => {
        const addPreSignedUrl = async () => {
            const updatedClasses = await Promise.all(classes.map(async (item) => {
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

            setClassesPreSignedUrl(updatedClasses.filter((item): item is MyCookingClass => item !== undefined));
        };

        addPreSignedUrl();

    }, [classes]);

    
    // Create an array with the CLASS_DATE from each cooking class to be displayed in the CustomDatePicker
    useSetClassDate(classesPreSignedUrl, setSelectedDates);

    
    if (classes.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any In Person classes yet</p>
    else 
        return (
            <>
                <ClassRescheduleDisclaimer />
                <div className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                    {classesPreSignedUrl!.map((item)=>( 
                        <Card key={item.TITLE} additionalClass={"gray-border"}>
                            <Card.Title>
                                <MyClassTitle title={item.TITLE} classId={item.CLASS_ID}/>
                            </Card.Title>
                            <Card.Description>
                                {<ExpandableText labelShowMore={"Show Description"} labelShowLess={"Hide Description"}>{item.DESCRIPTION}</ExpandableText>}
                            </Card.Description>

                            <div className="myclasses__classes-list">
                                {
                                    item.CLASSES_LIST.map((recipe: Recipe) => {
                                        return (
                                            <React.Fragment key={recipe.TITLE}>
                                                <img className='icon-list' src="/assets/icon-leaf.svg" alt="Leaf icon" />
                                                <p className="align-self-c">{recipe.TITLE}</p>
                                            </React.Fragment>
                                        )
                                        }
                                    )
                                }
                            </div>
                            <div className="top-margin--large regular-text">
                                <CustomDatePicker key={item.CLASS_ID}
                                        label={"Class date: "}
                                        // selectedDates is an array, as there can be multiple Date Picker in the page for different classes
                                        selectedDate={selectedDates[item.CLASS_ID]!}
                                        onDateChange={(date: Date | null) => handleSetMyClasstDate(userInfo!.email, date!, item.CLASS_ID, setSelectedDates, selectedDates)}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </>
        )
}