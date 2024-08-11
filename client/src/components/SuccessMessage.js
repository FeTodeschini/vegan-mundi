import "../css/typography.css";

export default function SuccessMessage({message}){
    return (
        <p className="success">{message}</p>
    )
}