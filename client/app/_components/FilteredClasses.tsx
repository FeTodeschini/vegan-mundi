import { useContext } from "react";
import { StateContext } from "../StateProvider";
import Card from "./Card"
import Button from "./Button";
import ButtonRemoveFromCart from "./ButtonRemoveFromCart";
import { addItem, removeItem } from "@/redux/slices/cartSlice"
import SectionHeader from './SectionHeader';
import { useModal } from "./Modal";
import ModalAddToCart from "./ModalAddToCart";
import '../_styles/gallery.css';
import { FilteredClassesProps } from '@/_types/global';
import { CookingClass } from '@/_types/cooking-class';
import { useSelector } from "react-redux";
import { ReduxRootState } from "@/_types/redux";


export default function FilteredClasses ({images, resultsFound, title, subTitle}: FilteredClassesProps){
    const { cartItems } = useSelector((state: ReduxRootState)=> state.cart)
    const { isModalOpen, selectedClass, setSelectedClass } = useContext(StateContext);
    const { openModal } = useModal();

    function onSelectClassType(item: CookingClass) {
        if (setSelectedClass)
            setSelectedClass(item);
        openModal();
    }

    return (
        <div className="container">
            <Button size="medium" additionalClass={"btn--back-home"} link={"/"}>&larr; Back to home</Button>
            <SectionHeader title={title} subTitle={subTitle}/>

            {(resultsFound ?? 0) > 0 || subTitle!.includes("Category:") ? <SectionHeader subTitle={"Add a class to your cart to select if it will be in person or online"}/> : ""}
            <div className="grid-auto-fit top-margin--medium">
                {images.map((item, index)=>( 
                    <>
                        <Card key={index}>
                            <Card.TopImage imgSource={item.PRE_SIGNED_URL} imgLink={`/classes/${encodeURIComponent(item.CATEGORY_ID)}`} />
                            <Card.Title>{item.TITLE}</Card.Title>
                            <Card.Description>{item.DESCRIPTION}</Card.Description>                                                        
                            <Card.Content>
                                {item.CLASSES_LIST === null ? '' :
                                    item.CLASSES_LIST.split("|").map((item: string) => {
                                        return (
                                            <div className='card__items-list' key={item}>
                                                <img className='icon-list' src="/assets/icon-leaf.svg" alt="Leaf icon" />
                                                <p>{item}</p>
                                            </div>
                                        )
                                        }
                                    )
                                }
                            </Card.Content>
                            {/* Render the Add or Remove button */}
                            <div className="flex-col">
                                {/* If item is not in the shopping cart yet, renders the "Add to Cart" button. Otherwise, renders the "Remove" button */}
                                {cartItems!.filter((currentItem: CookingClass)=>currentItem.TITLE === item.TITLE).length > 0 ?
                                    <ButtonRemoveFromCart item={item} />
                                :
                                    <Button bgColor={"green"} type={"button"} size={"medium"} onClick={()=>onSelectClassType(item)}>Add to cart</Button>
                                }
                                <Button size={"medium"}>Learn More &rarr;</Button>
                            </div>
                        </ Card>

                        { isModalOpen &&
                            <ModalAddToCart padding={"8"} modalTitle={"Select Your Class Type:"} modalSubTitle={selectedClass!.TITLE}/>
                        }
                    </>
                ))}
            </div>
        </div>
    )
}