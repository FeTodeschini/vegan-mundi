import { useContext, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { StateContext } from "@/StateProvider";
import { checkTokenExpiration } from "@/_lib/tokenHelper";

const useCheckTokenExpiration = (token: string, setIsTokenValid: React.Dispatch<React.SetStateAction<boolean>>) => {
    const router = useRouter();
    const { setUserInfo, setToken, setResponseMessage } = useContext(StateContext);

    //  Check if token is valid. If there is no token, then the user is not logged in
    useEffect(() =>{
            checkTokenExpiration(token, setUserInfo, setToken, setIsTokenValid, setResponseMessage, router);
    },[token, setUserInfo, setToken]
    )
}

export default useCheckTokenExpiration;