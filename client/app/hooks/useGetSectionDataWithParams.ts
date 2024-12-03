'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config';
import { SectionData } from "../_types/section-data"
import { ObjectProperty } from "../_types/global";

// The optional header param is the "authorization" header with the jwt token for protected routes
export function useGetSectionDataWithParams<T extends SectionData>(
        setSectionData: (data: T[]) => void, 
        apiEndpoint: string,
        params: ObjectProperty | null,
        header?: object
    ) {

    // Fetch from the database the data for the landing page section received as an input parameter
    useEffect( ()=> {
        if (params) {
            getSectionDataWithParams(setSectionData, apiEndpoint, params, header)
        }
    } , [params]);

    async function getSectionDataWithParams(setSectionData: (data: T[]) => void, 
            apiEndpoint: string,
            params: ObjectProperty,
            header?: object) {

        let response;

        console.log(`header: ${JSON.stringify(header)}`);

        try {
            response = await axios.get(`
                ${config.serverEndpoint}${apiEndpoint}`,
                { 
                    params,
                    headers: header || {},
                 },
            );
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

        if (response && response.data) {
            setSectionData([...response.data]);
        }        
    }
}