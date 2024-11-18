import TokenProvider from '@/_components/TokenProvider';
import { MyCookingClass, Recipe } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';
import Link from 'next/link';
import React, { useState } from 'react';
import Card from './Card';
import MyClassTitle from './MyClassTitle';
import ReviewDisplay from './ReviewDisplay';
import ReviewCollector from './ReviewCollector';
import { useSelector } from 'react-redux';
import { ReduxRootState } from '@/_types/redux';
import useAddPreSignedUrlToMyClasses from '@/hooks/useAddPreSignedUrlToMyClasses';
import "@/_styles/myclasses.css"
import { useGetUnsubmittedReviews } from '@/hooks/useGetUnsubmittedReviews';


export default function MyClassesOnlineSelfPaced({classes}:ArrayProps<MyCookingClass>) {
    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]>([]);
    const { classesReview, unsubmittedReviews } = useSelector((state: ReduxRootState)=> state.review)

    useGetUnsubmittedReviews()

    // Fetch MyClasses and also if there is any unsubmitted review in case user reloads the page or change tabs while reviewing a class
    useAddPreSignedUrlToMyClasses(classes, setClassesPreSignedUrl, );

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
                        <Card.Content>{item.DESCRIPTION}</Card.Content>
                            {item.STARS || classesReview[item.CLASS_ID] !== undefined ?
                                    <ReviewDisplay 
                                        stars={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].stars : item.STARS} 
                                        reviewText={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].reviewText : item.REVIEW_TEXT}
                                        reviewTitle={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].reviewTitle : item.REVIEW_TITLE}
                                        isReviewed={true}
                                    />                                        
                                :
                                    <ReviewCollector 
                                        classId={item.CLASS_ID}
                                        unsubmittedReview={unsubmittedReviews[item.CLASS_ID] || {}}
                                    />
                            }
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

function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
}
