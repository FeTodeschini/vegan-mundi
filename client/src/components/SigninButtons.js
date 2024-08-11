import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SigninButtons() {
    const navigate = useNavigate();

    return (
        <div className="signin-buttons">
                <Button
                type="button"
                bgColor="green"
                isSubmit="true"
            >
                Sign in
            </Button> 

            <Button
                type="button"
                onClick={()=>navigate("/")}
            >
                Cancel
            </Button> 
        </div>
    )
}