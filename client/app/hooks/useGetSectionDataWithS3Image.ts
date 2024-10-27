'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config';
import { SectionData } from "@/_types/section-data"

export function useGetSectionDataWithS3Image<T extends SectionData>(
        setSectionData: (data: T[]) => void, 
        apiEndpoint: string,
        params: {} | null = null
    ) {

    // Fetch from the database the data for the landing page section received as an input parameter

    useEffect( ()=> {
        getSectionDataWithS3Image(setSectionData, apiEndpoint, params)
    } , []);


    async function getSectionDataWithS3Image(setSectionData: (data: T[]) => void, apiEndpoint: string, params: {} | null) {

        let response;

        try {
            const apiParams = params ? { params } : {};
            let apiUrl = `${config.serverEndpoint}${apiEndpoint}`
            
            // The API being called may or may not have parameters
            if (Object.keys(apiParams).length === 0)
                response = await axios.get(apiUrl);
            else
                response = await axios.get(apiUrl, apiParams);

        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }

        if (response && response.data) {
            setSectionData([...response.data]);
        }        
    }
}