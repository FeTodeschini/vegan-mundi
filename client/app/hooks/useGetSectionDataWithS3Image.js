'use client';

import { useEffect } from "react";
import axios from "axios";
import config from '../_lib/config.js';

export function useGetSectionDataWithS3Image(setSectionData, apiEndpoint) {
    // Fetch from the database the data for the landing page section received as an input parameter
    useEffect( ()=> {
        getSectionDataWithS3Image(setSectionData, apiEndpoint)
    } , []);

    async function getSectionDataWithS3Image(setSectionData, apiEndpoint) {
        let response = await axios.get(`${config.serverEndpoint}${apiEndpoint}`);
        setSectionData([...response.data]);
        console.log(`[...response.data]: ${[...response.data]}`);
    }
}