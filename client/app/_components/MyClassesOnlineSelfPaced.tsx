import { MyCookingClass, Recipe } from '../_types/cooking-class';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import MyClassTitle from './MyClassTitle';
import ReviewDisplay from './ReviewDisplay';
import ReviewCollector from './ReviewCollector';
import { useSelector } from 'react-redux';
import { ReduxRootState } from '../_types/redux';
import useAddPreSignedUrlToMyClasses from '../hooks/useAddPreSignedUrlToMyClasses';
import { useGetUnsubmittedReviews } from '../hooks/useGetUnsubmittedReviews';
import useResponsiveCardRows from '../hooks/useResponsiveCardRows';
import "../_styles/myclasses.css"


export default function MyClassesOnlineSelfPaced({classes}: {classes: MyCookingClass[]}) {
    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]>([]);
    const { classesReview, unsubmittedReviews } = useSelector((state: ReduxRootState)=> state.review)

    // Trick to resize page in case the ExpandableText component is being used in a page that uses the useResponsiveCardRows hook
    // so the div container height of the ExpandableText will be recalculated
    const [reloadPage, setReloadPage] = useState<{ [key: number]: boolean }>({});

    const [isLoading, setIsLoading] = useState(true);

    useGetUnsubmittedReviews()

    // Fetch MyClasses and also if there is any unsubmitted review in case user reloads the page or change tabs while reviewing a class
    useAddPreSignedUrlToMyClasses(classes, setClassesPreSignedUrl);

    const containerRef = useResponsiveCardRows(true);

    useEffect(()=> {
        setIsLoading(false)
    },[classesPreSignedUrl])

    if (isLoading) return;

    if (classesPreSignedUrl.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any Online Self Paced classes yet</p>
    else 
        return (
            <div ref={containerRef} className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                {classesPreSignedUrl.map((item)=>( 
                    <Card key={item.TITLE} additionalClass={"gray-border"}>
                        <Card.Title>
                            <MyClassTitle title={item.TITLE} classId={item.CLASS_ID}/>
                        </Card.Title>
                        {item.STARS || classesReview[item.CLASS_ID] !== undefined ?
                                <ReviewDisplay 
                                    stars={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].stars : item.STARS} 
                                    reviewText={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].reviewText : item.REVIEW_TEXT}
                                    reviewTitle={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].reviewTitle : item.REVIEW_TITLE}
                                    isReviewed={true}
                                    setReloadPage={setReloadPage}
                                    itemIndex={item.CLASS_ID}
                                />                                        
                            :
                                <ReviewCollector 
                                    classId={item.CLASS_ID}
                                    unsubmittedReview={unsubmittedReviews[item.CLASS_ID] || {}}
                                />
                        }
                        <Card.Content>{item.DESCRIPTION}</Card.Content>
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
                                            <p className="align-self--c">{recipe.TITLE}</p>
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