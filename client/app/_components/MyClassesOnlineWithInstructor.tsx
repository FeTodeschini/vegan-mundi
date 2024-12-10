import { MyCookingClass, Recipe } from '../_types/cooking-class';
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import MyClassTitle from './MyClassTitle';
import CustomDatePicker from './CustomDatePicker';
import VideoCallLink from './VideoCallLink';
import ClassRescheduleDisclaimer from './ClassRescheduleDisclaimer';
import { useSetClassDate } from '../hooks/useSetClassDate';
import { handleSetMyClasstDate } from '../_lib/myClassesHelper';
import { StateContext } from '../StateProvider';
import ReviewDisplay from './ReviewDisplay';
import { useSelector } from 'react-redux';
import { ReduxRootState } from '../_types/redux';
import { useGetUnsubmittedReviews } from '../hooks/useGetUnsubmittedReviews';
import useResponsiveCardRows from '../hooks/useResponsiveCardRows';
import { useRouter } from 'next/navigation';
import ReviewCollector from './ReviewCollector';
import { enumDeliveryMethods } from '@/_lib/enums';
import { fetchMyClasses } from '@/_lib/dataHelper';
import PaginationBar from './PaginationBar';
import SkeletonMyClasses from './SkeletonMyClasses';
import "../_styles/myclasses.css"

export default function MyClassesOnlineWithInstructor() {
    const [selectedDates, setSelectedDates] = useState<{ [key: number]: Date | null }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [myClasses, setMyClasses] = useState<MyCookingClass[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    
    const { classesReview, unsubmittedReviews } = useSelector((state: ReduxRootState)=> state.review)
    
    // Trick to resize page in case the ExpandableText component is being used in a page that uses the useResponsiveCardRows hook
    // so the div container height of the ExpandableText will be recalculated
    const [reloadPage, setReloadPage] = useState<{ [key: number]: boolean }>({});;

    const { userInfo, token } = useContext(StateContext)

    const router = useRouter();

    const header = { Authorization: `Bearer ${token}` }

    useGetUnsubmittedReviews()

    const fetchData = async (pageNumber: number) => {
        const params = 
            userInfo?.email ? { 
                email: userInfo.email,
                deliveryMethod: Number(enumDeliveryMethods.ONLINE_WITH_INSTRUCTOR),
                pageNumber: Number(pageNumber)
            } : null;
    
            const totalPages = await fetchMyClasses(setMyClasses, 'classes/user', params, router, header, isTokenValid);
            return totalPages;
    }

    useEffect(()=>{
        const asyncFetchData = async ()=> {
            const pages = await fetchData(pageNumber);
            setTotalPages(pages);
            setIsLoading(false);
        }

        asyncFetchData();
    },[pageNumber])

    // Create an array with the CLASS_DATE from each cooking class to be displayed in the CustomDatePicker
    useSetClassDate(myClasses, setSelectedDates);

    const containerRef = useResponsiveCardRows(true);

    if (isLoading) return <SkeletonMyClasses />
    
    if (myClasses.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any Online classes with Instructor yet</p>
    else 
        return (
            <>
                <ClassRescheduleDisclaimer />
                <PaginationBar page={pageNumber} onPageChange={setPageNumber} pageNumber={pageNumber} totalPages={totalPages}/>
                <div ref={containerRef} className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                    {myClasses.map((item)=>( 
                        <Card additionalClass={"gray-border"} key={item.TITLE}>
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
                            <Card.Content>
                                <p>{item.DESCRIPTION}</p>
                            </Card.Content>
                            <div className="card__section myclasses__classes-list">
                                {
                                    JSON.parse(item.CLASSES_LIST).map((recipe: Recipe, index: number) => {
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