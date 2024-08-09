import { Link } from 'react-router-dom';

export default function Button({ bgColor, additionalClass, type="link", link=null, size="large", children, onClick}) {

    // check if it should render a regular button or a "text button" (like a link)
    var className = type === "button" ? "btn" : "btn--link";

    // Check if there is custom color for the button, otherwise it will have the default color white
    className = className.concat(bgColor !== undefined ? ` btn--${bgColor}` : "");

    className = className.concat(size === "medium" ? " btn-medium" : "");

    // cehck if any additional custom class needs to be applied to the button
    className = `${ className } ${additionalClass !== undefined ? additionalClass : ""}`;
    
    // in case there is no link assigned to the button, the button will execute the function passed in onClick
    if (link === null) {
        return (
            <button className={className} onClick={onClick}>{ children }</button>
        )
    }

    // in case there is a link assigned to the button, wrap it with the <Link> element
    return <Link to={link}><button className={className}>{ children }</button></Link>
}