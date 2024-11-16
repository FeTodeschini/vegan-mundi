import TokenProvider from '@/_components/TokenProvider';
import { addPreSignedUrlToString } from '@/_lib/S3Helper';
import { MyCookingClass, Recipe } from '@/_types/cooking-class';
import { ArrayProps } from '@/_types/global';
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import MyClassTitle from './MyClassTitle';
import CustomDatePicker from './CustomDatePicker';
import VideoCallLink from './VideoCallLink';
import ClassRescheduleDisclaimer from './ClassRescheduleDisclaimer';
import { useSetClassDate } from '@/hooks/useSetClassDate';
import { handleSetMyClasstDate } from '@/_lib/MyClassesHelper';
import { StateContext } from '@/StateProvider';
import ReviewDisplay from './ReviewDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxRootState } from '@/_types/redux';
import useGetMyClasses from '@/hooks/useGetMyClassesAndPendingReviews';
import "@/_styles/myclasses.css"
import ReviewCollector from './ReviewCollector';
import { useGetUnsubmittedReviews } from '@/hooks/useGetUnsubmittedReviews';

export default function MyClassesOnlineWithInstructor({classes}:ArrayProps<MyCookingClass>) {
    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]>([]);
    const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date | null }>({});
    const { classesReview, unsubmittedReviews } = useSelector((state: ReduxRootState)=> state.review)

    const { userInfo } = useContext(StateContext)

    const dispatch = useDispatch();

    useGetUnsubmittedReviews()
    
    // Fetch MyClasses and also if there is any unsubmitted review in case user reloads the page or change tabs while reviewing a class
    useGetMyClasses(classes, setClassesPreSignedUrl);
   
    // Create an array with the CLASS_DATE from each cooking class to be displayed in the CustomDatePicker
    useSetClassDate(classesPreSignedUrl, setSelectedDates);

    if (classes.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any Online classes with Instructor yet</p>
    else 
        return (
            <>
                <ClassRescheduleDisclaimer />
                <div className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                    {classesPreSignedUrl.map((item)=>( 
                        <Card additionalClass={"gray-border"} key={item.TITLE}>
                            <Card.Title>
                                <MyClassTitle title={item.TITLE} classId={item.CLASS_ID}/>
                            </Card.Title>
                            <Card.Description><p>{item.DESCRIPTION}</p></Card.Description>
                            {item.STARS || classesReview[item.CLASS_ID] !== undefined ?
                                    <ReviewDisplay 
                                        stars={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].stars : item.STARS} 
                                        reviewText={classesReview[item.CLASS_ID] !== undefined ? classesReview[item.CLASS_ID].reviewText : item.REVIEW_TEXT}/>                                        
                                :
                                    <ReviewCollector 
                                        classId={item.CLASS_ID}
                                        // unsubmittedReview={unsubmittedReviews[item.CLASS_ID] || { stars: 0, reviewText: '' }}
                                        unsubmittedReview={unsubmittedReviews[item.CLASS_ID] || {}}
                                    />
                            }
                            <div className="myclasses__classes-list">
                                {
                                    item.CLASSES_LIST.map((recipe: Recipe, index: number) => {
                                        return (
                                            <React.Fragment key={index}>
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
                                    selectedDate={selectedDates[item.CLASS_ID]}
                                    onDateChange={(date: Date | null) => handleSetMyClasstDate(userInfo!.email, date!, item.CLASS_ID, setSelectedDates, selectedDates)}
                                />
                            </div>
                            <VideoCallLink />
                        </Card>
                    ))}
                </div>
            </>
        )
}