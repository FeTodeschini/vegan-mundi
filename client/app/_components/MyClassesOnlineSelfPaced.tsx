import { MyCookingClass, Recipe } from '../_types/cooking-class';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
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
import { StateContext } from '@/StateProvider';
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration';
import { fetchMyClasses } from '@/_lib/dataHelper';
import { enumDeliveryMethods } from '@/_lib/enums';
import PaginationBar from './PaginationBar';
import SkeletonMyClasses from './SkeletonMyClasses';
import { useRouter } from 'next/navigation';


export default function MyClassesOnlineSelfPaced() {
    // Trick to resize page in case the ExpandableText component is being used in a page that uses the useResponsiveCardRows hook
    // so the div container height of the ExpandableText will be recalculated
    const [reloadPage, setReloadPage] = useState<{ [key: number]: boolean }>({});
    const [classesPreSignedUrl, setClassesPreSignedUrl] = useState<MyCookingClass[]|null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myClasses, setMyClasses] = useState<MyCookingClass[]|null>(null);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const { classesReview, unsubmittedReviews } = useSelector((state: ReduxRootState)=> state.review)
    const { userInfo, token } = useContext(StateContext)

    const router = useRouter();
    
    const header = { Authorization: `Bearer ${token}` }

    useCheckTokenExpiration(token, setIsTokenValid);

    useGetUnsubmittedReviews()

    const fetchData = async (pageNumber: number) => {
        //  userInfo is null the first time this function is executed (because StateContext is getting if from localStorage, which takes some time)
        const params = 
            userInfo?.email ? { 
                email: userInfo.email,
                deliveryMethod: Number(enumDeliveryMethods.ONLINE_SELF_PACED),
                pageNumber: Number(pageNumber)
            } : null;
    
            const totalPages = await fetchMyClasses(setMyClasses, 'classes/user', params, router, header, isTokenValid);
            return totalPages;
    }

    useEffect(()=>{
        const asyncFetchData = async ()=> {
            const pages = await fetchData(pageNumber);
            setTotalPages(pages);
        }
        asyncFetchData();
    },[pageNumber, userInfo]) // userInfo was added to the dependency array, so when it is ready, fetchData is called again. Would using promisse.all be a better solution? 

    // Fetch MyClasses and also if there is any unsubmitted review in case user reloads the page or change tabs while reviewing a class
    useAddPreSignedUrlToMyClasses(myClasses!, setClassesPreSignedUrl);

    const containerRef = useResponsiveCardRows(true);

    useEffect(()=> {
        if (classesPreSignedUrl) setIsLoading(false)
    },[classesPreSignedUrl])

    if (isLoading) return <SkeletonMyClasses />

    if (classesPreSignedUrl!.length ===0)
        return <p className="regular-text myclasses__nopurchase">You have not purchased any Online Self Paced classes yet</p>
    else 
        return (
            <div className="top-margin--large">
                <PaginationBar
                    page={pageNumber}
                    onPageChange={setPageNumber}
                    pageNumber={pageNumber} 
                    totalPages={totalPages}
                />
                <div ref={containerRef} className="grid-auto-fit grid-auto-fit--large top-margin--medium">
                    {classesPreSignedUrl!.map((item)=>( 
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
            </div>
        )
}