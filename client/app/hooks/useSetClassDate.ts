'use client';

import { MyCookingClass } from "../_types/cooking-class";
import { useEffect } from "react";

export function useSetClassDate(classes: MyCookingClass[], setSelectedDates: (newSelectedDates: {[key: number]: Date | null})=>void){
    useEffect(() => {
        const newSelectedDates: { [key: number]: Date | null } = {};
        classes.forEach(item => {
            if (item.CLASS_ID !== undefined && item.CLASS_DATE) {
                newSelectedDates[item.CLASS_ID] = new Date(item.CLASS_DATE);
            }
        });

        setSelectedDates(newSelectedDates); 

    }, [classes]);

    return null;
}