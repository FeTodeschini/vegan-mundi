'use client'

import DarkBackground from '@/_components/DarkBackground';
import MyClasses from '@/_components/MyClasses';
import useSetToken from '@/hooks/useSetToken';

export default function Page() {
    useSetToken()
    
    return (
        <>
            <DarkBackground />
            <MyClasses/>
        </>
    )
}
