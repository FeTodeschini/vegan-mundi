import axios from "axios";
import config from '../_lib/config';
import { ObjectProperty } from "../_types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const fetchMyClasses = async<T> (setData: (data: T[]) => void, 
        apiEndpoint: string,
        params: ObjectProperty | null,
        router: AppRouterInstance,
        header?: object,
        isTokenValid?: boolean
) => {

    async function fetchData(setData: (data: T[]) => void, 
            apiEndpoint: string,
            params: ObjectProperty,
            router: AppRouterInstance,
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
                console.error("Error fetching data from fetchDataWithParams:", error);
                throw error;
            }
        }

        if (response && response.data) {
            setData([...response.data.data]);
            console.log("response.data: ", response.data);
            return response.data.totalPages;
        }        
    }

    if (params && (isTokenValid === undefined || isTokenValid)) {
        return await fetchData(setData, apiEndpoint, params, router, header)
    }
    return 0;
}

export { fetchMyClasses };