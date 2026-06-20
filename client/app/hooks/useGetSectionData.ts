'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config';
import { SectionData } from "../_types/section-data"

const SECTION_FETCH_RETRIES = 5;
const SECTION_FETCH_DELAY_MS = 350;

async function delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGetSectionData<T extends SectionData>(
        setSectionData: (data: T[]) => void, 
        apiEndpoint: string,
        params: {} | null = null
    ) {

    // Fetch from the database the data for the landing page section received as an input parameter

    useEffect( ()=> {
        getSectionData(setSectionData, apiEndpoint, params)
    } , []);


    async function getSectionData(setSectionData: (data: T[]) => void, apiEndpoint: string, params: {} | null) {

        const apiParams = params ? { params } : {};
        const apiUrl = `${config.serverEndpoint}${apiEndpoint}`;

        for (let attempt = 1; attempt <= SECTION_FETCH_RETRIES; attempt += 1) {
            try {
                const response = Object.keys(apiParams).length === 0
                    ? await axios.get(apiUrl)
                    : await axios.get(apiUrl, apiParams);

                if (response && Array.isArray(response.data)) {
                    setSectionData([...response.data]);
                    return;
                }

                setSectionData([]);
                return;
            } catch (error) {
                if (attempt === SECTION_FETCH_RETRIES) {
                    console.error("Error fetching data:", error);
                    setSectionData([]);
                    return;
                }

                await delay(SECTION_FETCH_DELAY_MS * attempt);
            }
        }
    }
}