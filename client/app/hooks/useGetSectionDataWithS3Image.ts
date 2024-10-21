'use client';

import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import config from '../_lib/config';
import { SectionData } from "@/_types/section-data"

export function useGetSectionDataWithS3Image<T extends SectionData>(setSectionData: (data: T[]) => void, apiEndpoint: string) {
    // Fetch from the database the data for the landing page section received as an input parameter
    useEffect( ()=> {
        getSectionDataWithS3Image(setSectionData, apiEndpoint)
    } , []);

    async function getSectionDataWithS3Image(setSectionData: (data: T[]) => void, apiEndpoint: string) {
        let response = await axios.get(`${config.serverEndpoint}${apiEndpoint}`);
        setSectionData([...response.data]);
    }
}