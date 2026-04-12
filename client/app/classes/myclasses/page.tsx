'use client'

import { useContext, useEffect, useMemo, useState } from 'react';
import SectionHeader from '../../_components/common-ui/SectionHeader';
import TokenProvider from '../../_components/token/TokenProvider';
import MyClassesOnlineSelfPaced from '../../_components/classes/MyClassesOnlineSelfPaced';
import MyClassesInPerson from '../../_components/classes/MyClassesInPerson';
import MyClassesOnlineWithInstructor from '../../_components/classes/MyClassesOnlineWithInstructor';
import { StateContext } from '../../StateProvider';
import { MyCookingClass } from '../../_types/cooking-class';
import Tabs from '../../_components/common-ui/Tabs';
import Tab from '../../_components/common-ui/Tab';
import Button from '../../_components/common-ui/Button';
import useCheckTokenExpiration from '../../hooks/useCheckTokenExpiration';
import '../../_styles/main.css';

export default function Page() {

    const [classesOnlineSelfPaced, setClassesOnlineSelfPaced] = useState<MyCookingClass[]>([]);
    const [classesOnlineWithInstructor, setClassesOnlineWithInstructor] = useState<MyCookingClass[]>([]);
    const [classesInPerson, setClassesInPerson] = useState<MyCookingClass[]>([]);
    const [isTokenValid, setIsTokenValid] = useState(true);

    const { token } = useContext(StateContext)

    //  If token is expired, redirects user to the login page
    useCheckTokenExpiration(token, setIsTokenValid);

    return (
        <>
            <TokenProvider />
            <section className="container section-my-classes">
                <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
                <SectionHeader title="My Classes" />
                    <Tabs>
                        <Tab label="Self-Paced">
                            <MyClassesOnlineSelfPaced/>
                        </Tab>
                        <Tab label="Online Instructor">
                            <MyClassesOnlineWithInstructor/>
                        </Tab>
                        <Tab label="In Person">
                            <MyClassesInPerson/>
                        </Tab>
                    </Tabs>
            </section>
        </>
    );
}

