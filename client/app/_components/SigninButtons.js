import Button from "../_components/Button";

export default function SigninButtons() {
    // const navigate = useNavigate();

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
                // onClick={()=>navigate("/")}
                onClick={()=>alert("Implement navigate('/')")}                
            >
                Cancel
            </Button> 
        </div>
    )
}