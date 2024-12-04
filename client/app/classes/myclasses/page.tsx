'use client'

import { useContext, useEffect, useMemo, useState } from 'react';
import SectionHeader from '../../_components/SectionHeader';
import TokenProvider from '../../_components/TokenProvider';
import MyClassesOnlineSelfPaced from '../../_components/MyClassesOnlineSelfPaced';
import MyClassesInPerson from '../../_components/MyClassesInPerson';
import MyClassesOnlineWithInstructor from '../../_components/MyClassesOnlineWithInstructor';
import { enumDeliveryMethods } from '../../_lib/enums';
import { useAddPreSignedUrlToArray } from '../../hooks/useAddPreSignedUrlToArray';
import { useGetSectionDataWithParams } from '../../hooks/useGetSectionDataWithParams';
import { StateContext } from '../../StateProvider';
import { MyCookingClass } from '../../_types/cooking-class';
import Tabs from '../../_components/Tabs';
import Tab from '../../_components/Tab';
import '../../_styles/main.css';
import Button from '../../_components/Button';
import useCheckTokenExpiration from '@/hooks/useCheckTokenExpiration';

export default function Page() {

    const [isLoading, setIsLoading] = useState(true);
    const [sectionData, setSectionData] = useState<MyCookingClass[]>([])
    const [images, setImages] = useState<MyCookingClass[]>([]);
    const [classesOnlineSelfPaced, setClassesOnlineSelfPaced] = useState<MyCookingClass[]>([]);
    const [classesOnlineWithInstructor, setClassesOnlineWithInstructor] = useState<MyCookingClass[]>([]);
    const [classesInPerson, setClassesInPerson] = useState<MyCookingClass[]>([]);
    const [isTokenValid, setIsTokenValid] = useState(false);

    const { userInfo, token } = useContext(StateContext)

    //  If token is expired, redirects user to the login page
    useCheckTokenExpiration(token, setIsTokenValid);

    const params = useMemo(() => {
        return userInfo?.email ? { email: userInfo.email } : null;
    }, [userInfo?.email]);

    const header = { Authorization: `Bearer ${token}` }

    useGetSectionDataWithParams(setSectionData, 'classes/user', params, header, isTokenValid );

    // Filter cooking classes based on delivery method (IN_PERSON, ONLINE_WITH_INSTRUCTOR and ONLINE_SELF_PACED
    useEffect (() => {
        const filterClassPerDeliveryMethod = (deliveryMethod: number) =>
        images.filter((classItem) => classItem.DELIVERY_METHOD_ID === deliveryMethod);

        setClassesOnlineSelfPaced(filterClassPerDeliveryMethod(enumDeliveryMethods.ONLINE_SELF_PACED));
        setClassesOnlineWithInstructor(filterClassPerDeliveryMethod(enumDeliveryMethods.ONLINE_WITH_INSTRUCTOR));
        setClassesInPerson(filterClassPerDeliveryMethod(enumDeliveryMethods.IN_PERSON));
    },[images])

    // Add the AWS S3 pre-signed URL to the images (as they are in private buckets and can't be accessed with their regular URLs)
    useAddPreSignedUrlToArray(sectionData, 'vegan-mundi-thumbnails', setImages, setIsLoading);

    return (
        <>
            <TokenProvider />
            <section className="container section-my-classes">
                <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
                <SectionHeader title="My Classes" />
                <Tabs>
                    <Tab label="Self-Paced">
                        <MyClassesOnlineSelfPaced classes={classesOnlineSelfPaced} dataLoaded={!isLoading} />
                    </Tab>
                    <Tab label="Online Instructor">
                        <MyClassesOnlineWithInstructor classes={classesOnlineWithInstructor} dataLoaded={!isLoading}/>
                    </Tab>
                    <Tab label="In Person">
                        <MyClassesInPerson classes={classesInPerson} dataLoaded={!isLoading}/>
                    </Tab>
                </Tabs>
            </section>
        </>
    );
}

