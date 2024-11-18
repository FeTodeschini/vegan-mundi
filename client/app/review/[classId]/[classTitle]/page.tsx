'use client'

import { useGetSectionDataWithParams } from '@/hooks/useGetSectionDataWithParams';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import SectionHeader from '@/_components/SectionHeader';
import Button from '@/_components/Button';
import Card from '@/_components/Card';
import { Review } from '@/_types/review';
import ReviewStarsContainer from '@/_components/ReviewStarsContainer';
import '@/_styles/main.css';
import '@/_styles/review.css';

export default function Page() {

    const [reviews, setReviews ] = useState([]);

    const params = useParams()

    const classTitle = params.classTitle as string; 

    const classId = useMemo(() => {
        return { classId: params.classId as string};
    }, [params]);

    useGetSectionDataWithParams(setReviews, 'review/get-class/', classId)
    
    return (
        <>
            <section className="container">
                <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
                <SectionHeader title={`REVIEWS: ${decodeURIComponent(classTitle)}`}/>
                <div className="grid-auto-fit">
                    {
                        reviews.map((item: Review)=> (
                            <Card key={''}>
                                <Card.Title>
                                    {item.REVIEWER_NAME} - {item.REVIEW_TITLE}
                                    <ReviewStarsContainer 
                                        key={item.CLASS_ID}
                                        classId={null}
                                        classTitle={null}
                                        stars={item.STARS}/>
                                </Card.Title>
                                <Card.Content>
                                    {item.REVIEW_TEXT}
                                </Card.Content>
                            </Card>
                        )

                        )
                    }
                </div>
            </section>
        </>
    );
}

