import TokenProvider from '@/_components/TokenProvider';
import { addPreSignedUrlToString } from '@/_lib/S3Helper';
import { MyCookingClass, Recipe } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ExpandableText from './ExpandableText';
import Card from './Card';
import "@/_styles/myclasses.css"
import React from 'react';
import MyClassTitle from './MyClassTitle';

export default function MyClassesOnlineSelfPaced({classes}:ArrayProps<MyCookingClass>) {

    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]>([]);
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

    }, [classes]); // Dependency array ensures this runs when classes change
    
    if (classes.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any Online Self Paced classes yet</p>
    else 
        return (
            <div className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                {classesPreSignedUrl.map((item)=>( 
                    <Card key={item.TITLE} additionalClass={"gray-border"}>
                        <Card.Title>
                            <MyClassTitle title={item.TITLE} classId={item.CLASS_ID}/>
                        </Card.Title>
                        <Card.Description>
                            {<ExpandableText labelShowMore={"Show Description"} labelShowLess={"Hide Description"}>{item.DESCRIPTION}</ExpandableText>}
                        </Card.Description>

                        <div className="myclasses__classes-list">
                            {
                                item.CLASSES_LIST.map((recipe: Recipe, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className="myclasses__img-wrapper">
                                                <img className="img-small" src={recipe.PHOTO} />
                                                <Link href={`/videoplayer/${recipe.RECIPE_ID}`}>
                                                    <img className='icon-play' src="/assets/icon-play.svg" />
                                                </Link>
                                            </div>
                                            <p className="align-self-c">{recipe.TITLE}</p>
                                        </React.Fragment>
                                    )
                                    }
                                )
                            }
                        </div>
                    </Card>
                ))}
            </div>
        )
}