'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config';
import { SectionData } from "../_types/section-data"
import { ObjectProperty } from "../_types/global";
import { useRouter } from "next/navigation";

// The optional header param is the "authorization" header with the jwt token for protected routes
export function useGetSectionDataWithParams<T extends SectionData>(
        setSectionData: (data: T[]) => void, 
        apiEndpoint: string,
        params: ObjectProperty | null,
        header?: object,
        isTokenValid?: boolean
    ) {

    const router = useRouter();
    // Fetch from the database the data for the landing page section received as an input parameter
    useEffect( ()=> {
        // Fetches data only if there is no token provided (route is not protected) or, if a token was provided, if it is valid/not expired (protected route)
        if (params && (isTokenValid === undefined || isTokenValid)) {
            getSectionDataWithParams(setSectionData, apiEndpoint, params, header)
        }
    } , [params, isTokenValid]);

    async function getSectionDataWithParams(setSectionData: (data: T[]) => void, 
            apiEndpoint: string,
            params: ObjectProperty,
            header?: object) {

        let response;

        try {
            response = await axios.get(`
                ${config.serverEndpoint}${apiEndpoint}`,
                { 
                    params,
                    headers: header || {},
                 },
            );
        } catch (error: any) {
            if (error.response && error.status ===403) {
                router.push('/account/signin');
            } else {
                console.error("Error fetching data from getSectionDataWithParams:", error);
                throw error;
            }
        }

        if (response && response.data) {
            setSectionData([...response.data]);
        }        
    }
}