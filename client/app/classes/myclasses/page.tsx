'use client'

import { useContext, useEffect, useMemo, useState } from 'react';
import SectionHeader from '@/_components/SectionHeader';
import TokenProvider from '@/_components/TokenProvider';
import MyClassesOnlineSelfPaced from '@/_components/MyClassesOnlineSelfPaced';
import MyClassesInPerson from '@/_components/MyClassesInPerson';
import MyClassesOnlineWithInstructor from '@/_components/MyClassesOnlineWithInstructor';
import { enumDeliveryMethods } from '@/_lib/enums';
import { useAddPreSignedUrlToArray } from '@/hooks/useAddPreSignedUrlToArray';
import { useGetSectionDataWithParams } from '@/hooks/useGetSectionDataWithParams';
import { StateContext } from '@/StateProvider';
import { MyCookingClass } from '@/_types/cooking-class';
import Tabs from '@/_components/Tabs';
import Tab from '@/_components/Tab';
import '@/_styles/main.css';

export default function Page() {

    const [isLoading, setIsLoading] = useState(true);
    const [sectionData, setSectionData] = useState<MyCookingClass[]>([])
    const [images, setImages] = useState<MyCookingClass[]>([]);
    const [classesOnlineSelfPaced, setClassesOnlineSelfPaced] = useState<MyCookingClass[]>([]);
    const [classesOnlineWithInstructor, setClassesOnlineWithInstructor] = useState<MyCookingClass[]>([]);
    const [classesInPerson, setClassesInPerson] = useState<MyCookingClass[]>([]);

    const { userInfo } = useContext(StateContext)
    
    const params = useMemo(() => {
        return userInfo?.email ? { email: userInfo.email } : null;
    }, [userInfo?.email]);

    useGetSectionDataWithParams(setSectionData, 'classes/user', params);

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
            <section className="container">
                <SectionHeader title="My Classes" />
                <Tabs>
                    <Tab label="Self-Paced">
                        <MyClassesOnlineSelfPaced classes={classesOnlineSelfPaced} />
                    </Tab>
                    <Tab label="Online Instructor">
                        <MyClassesOnlineWithInstructor classes={classesOnlineWithInstructor} />
                    </Tab>
                    <Tab label="In Person">
                        <MyClassesInPerson classes={classesInPerson} />
                    </Tab>
                </Tabs>
            </section>
        </>
    );
}

