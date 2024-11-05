'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config';
import { SectionData } from "@/_types/section-data"
import { ObjectProperty } from "@/_types/global";


export function useGetSectionDataWithParams<T extends SectionData>(
        setSectionData: (data: T[]) => void, 
        apiEndpoint: string,
        params: ObjectProperty | null
    ) {

    // Fetch from the database the data for the landing page section received as an input parameter
    useEffect( ()=> {
        if (params) {
            getSectionDataWithParams(setSectionData, apiEndpoint, params)
        }
            
    } , [params]);


    async function getSectionDataWithParams(setSectionData: (data: T[]) => void, apiEndpoint: string, params: ObjectProperty) {

        let response;

        if (!params || !params.email) return;

        try {
            console.log(`Getting classes for user: ${config.serverEndpoint}${apiEndpoint}`)
            console.log(`params: ${JSON.stringify(params)}`)

            response = await axios.get(`${config.serverEndpoint}${apiEndpoint}`, { params });
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

        if (response && response.data) {
            setSectionData([...response.data]);
        }        
    }
}