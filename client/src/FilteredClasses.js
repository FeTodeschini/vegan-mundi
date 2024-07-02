import { useNavigate } from "react-router-dom";

import Card from "./ui-components/Card.js"
import Button from "./ui-components/Button.js";
import SeactionHeader from './ui-components/SectionHeader.js';

export default function FilteredClasses ({images, imgLink="", linkState="", title, subTitle}){
    const navigate = useNavigate();

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} onClick={()=>navigate("/")}>&larr; Back to home</Button>
            <SeactionHeader title={title} subTitle={subTitle}/>
            <div className="grid-auto-fit">
                {images.map(item=>(
                    <Card 
                        imgSource={item.PRE_SIGNED_URL}
                        imgLink={imgLink}
                        title={item.TITLE} 
                        description={item.DESCRIPTION} 
                        key={item.PRE_SIGNED_URL}
                    >
                        <div className="flex-col">
                            <Button bgColor={"green"} type={"button"} size={"medium"}>Add to cart</Button>
                            <Button size={"medium"}>Learn More &rarr;</Button>
                        </div>
                    </ Card>
                ))}
            </div>
        </div>
    )
}