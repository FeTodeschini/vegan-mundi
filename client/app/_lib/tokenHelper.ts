import { jwtDecode } from "jwt-decode";
import { signOutCleanUp } from "./accountHelper";
import { UserInfo } from "../_types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const isTokenExpired = (token: string) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp! < currentTime;
      } catch (error) {
        console.error('Error decoding token:', error);
        return true;
      }
}

const checkTokenExpiration = async (token: string,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    setIsTokenValid: React.Dispatch<React.SetStateAction<boolean>>,
    setResponseMessage: React.Dispatch<React.SetStateAction<string>>,
    router: AppRouterInstance) => 
{
  if (token) {
    if (isTokenExpired(token)){
        // If token is expired, logs user out and redirect them to the login page
        await signOutCleanUp(setUserInfo, setToken)   
        setIsTokenValid(false);
        setResponseMessage("Your session expired. Please sign in again.");
        router.push("/account/signin");
    }
    else {
        setIsTokenValid(true);
        return true;
    }
  }
}

export { isTokenExpired, checkTokenExpiration };