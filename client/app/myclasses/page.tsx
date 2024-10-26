'use client'

import MyClasses from '@/_components/MyClasses';
import useSetToken from '@/hooks/useSetToken';

export default function Page() {
    useSetToken()
    
    return (
            <MyClasses/>
    )
}
