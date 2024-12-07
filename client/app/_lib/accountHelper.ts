import { UserInfo } from "../_types/global";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const objUserInfo = {
    firstName: "Sign in",
    lastName: "",
    email: ""
}

const signOutCleanUp = async (setUserInfo: (userInfo: UserInfo) => void, setToken: (token: string)=> void)  => {
     // Resets User info and token
    setToken("");
    setUserInfo(objUserInfo);

    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
}

const isUserLogged = (email: string, setResponseMessage: (responseMessage: string) => void, router: AppRouterInstance, message: string|null=null)  => {
    if (email ==="") {
        message && setResponseMessage(message)
        router.push('account/signin')
        return false;
    }
    
    return true;
}

export { signOutCleanUp, isUserLogged };