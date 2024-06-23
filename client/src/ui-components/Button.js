export default function Button({ bgColor, additionalClass, type="link", children}) {

    // check if it should render a regular button or a "text button" (like a link)
    var className = type === "button" ? "btn" : "btn--link";

    // Check if there is custom color for the button, otherwise it will have the default color white
    className = className.concat(bgColor !== undefined ? ` btn--${bgColor}` : "");

    // cehck if any additional custom class needs to be applied to the button
    className = `${ className } ${additionalClass !== undefined ? additionalClass : ""}`;
    
    return (
        <button className={className}>{ children }</button>
    )
}